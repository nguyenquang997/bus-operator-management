using System.Linq.Expressions;
using System.Net;
using BusOperator.Application.Common;
using BusOperator.Application.DTOs.Trips;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Entities;
using BusOperator.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BusOperator.Infrastructure.Services;

public class TripService(AppDbContext dbContext, ICurrentUserContext currentUserContext) : ITripService
{
    public async Task<IReadOnlyCollection<TripResponse>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await dbContext.Trips.AsNoTracking()
            .Include(x => x.Route)
            .Include(x => x.Vehicle)
            .Include(x => x.Driver)
            .Include(x => x.Assistant)
            .OrderByDescending(x => x.DepartureDate)
            .ThenByDescending(x => x.DepartureTime)
            .Select(ToResponseExpr)
            .ToListAsync(cancellationToken);
    }

    public async Task<TripResponse> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        return await dbContext.Trips.AsNoTracking()
            .Where(x => x.Id == id)
            .Select(ToResponseExpr)
            .FirstOrDefaultAsync(cancellationToken)
            ?? throw new AppException("Trip not found.", HttpStatusCode.NotFound);
    }

    public async Task<TripResponse> CreateAsync(TripCreateRequest request, CancellationToken cancellationToken = default)
    {
        await EnsureTripCodeUnique(request.TripCode, null, cancellationToken);
        await EnsureReferences(request.RouteId, request.VehicleId, request.DriverId, request.AssistantId, request.BranchId, cancellationToken);

        var vehicle = await dbContext.Vehicles.FirstAsync(x => x.Id == request.VehicleId, cancellationToken);
        var route = await dbContext.Routes.FirstAsync(x => x.Id == request.RouteId, cancellationToken);

        var trip = new Trip
        {
            BranchId = request.BranchId,
            TripCode = request.TripCode,
            RouteId = request.RouteId,
            VehicleId = request.VehicleId,
            DriverId = request.DriverId,
            AssistantId = request.AssistantId,
            DepartureDate = request.DepartureDate,
            DepartureTime = request.DepartureTime,
            EstimatedArrivalTime = request.EstimatedArrivalTime,
            SeatCountSnapshot = vehicle.SeatCount,
            BaseTicketPriceSnapshot = route.BaseTicketPrice,
            Status = request.Status,
            Notes = request.Notes,
            BookingOpenTime = request.BookingOpenTime,
            BookingCloseTime = request.BookingCloseTime,
            AllowOnlineBooking = request.AllowOnlineBooking,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = AuditHelper.Actor(currentUserContext)
        };

        dbContext.Trips.Add(trip);
        await dbContext.SaveChangesAsync(cancellationToken);

        return await GetByIdAsync(trip.Id, cancellationToken);
    }

    public async Task<TripResponse> UpdateAsync(int id, TripUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var trip = await dbContext.Trips.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
            ?? throw new AppException("Trip not found.", HttpStatusCode.NotFound);

        await EnsureReferences(request.RouteId, request.VehicleId, request.DriverId, request.AssistantId, trip.BranchId, cancellationToken);

        var vehicle = await dbContext.Vehicles.FirstAsync(x => x.Id == request.VehicleId, cancellationToken);
        var route = await dbContext.Routes.FirstAsync(x => x.Id == request.RouteId, cancellationToken);

        trip.RouteId = request.RouteId;
        trip.VehicleId = request.VehicleId;
        trip.DriverId = request.DriverId;
        trip.AssistantId = request.AssistantId;
        trip.DepartureDate = request.DepartureDate;
        trip.DepartureTime = request.DepartureTime;
        trip.EstimatedArrivalTime = request.EstimatedArrivalTime;
        trip.SeatCountSnapshot = vehicle.SeatCount;
        trip.BaseTicketPriceSnapshot = route.BaseTicketPrice;
        trip.Notes = request.Notes;
        trip.BookingOpenTime = request.BookingOpenTime;
        trip.BookingCloseTime = request.BookingCloseTime;
        trip.AllowOnlineBooking = request.AllowOnlineBooking;
        trip.UpdatedAt = DateTime.UtcNow;
        trip.UpdatedBy = AuditHelper.Actor(currentUserContext);

        await dbContext.SaveChangesAsync(cancellationToken);
        return await GetByIdAsync(trip.Id, cancellationToken);
    }

    public async Task<TripResponse> UpdateStatusAsync(int id, TripStatusUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var trip = await dbContext.Trips.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
            ?? throw new AppException("Trip not found.", HttpStatusCode.NotFound);

        if (trip.Status == request.Status)
        {
            return await GetByIdAsync(id, cancellationToken);
        }

        var oldStatus = trip.Status;
        trip.Status = request.Status;
        trip.UpdatedAt = DateTime.UtcNow;
        trip.UpdatedBy = AuditHelper.Actor(currentUserContext);

        dbContext.TripStatusHistories.Add(new TripStatusHistory
        {
            TripId = trip.Id,
            OldStatus = oldStatus,
            NewStatus = request.Status,
            Note = request.Note,
            ChangedAt = DateTime.UtcNow,
            ChangedBy = currentUserContext.UserId
        });

        await dbContext.SaveChangesAsync(cancellationToken);
        return await GetByIdAsync(id, cancellationToken);
    }

    private async Task EnsureTripCodeUnique(string tripCode, int? ignoreId, CancellationToken cancellationToken)
    {
        if (await dbContext.Trips.AnyAsync(x => x.TripCode == tripCode && (!ignoreId.HasValue || x.Id != ignoreId), cancellationToken))
        {
            throw new AppException("Trip code already exists.", HttpStatusCode.Conflict);
        }
    }

    private async Task EnsureReferences(int routeId, int vehicleId, int driverId, int? assistantId, int branchId, CancellationToken cancellationToken)
    {
        if (!await dbContext.Routes.AnyAsync(x => x.Id == routeId, cancellationToken))
        {
            throw new AppException("Route not found.", HttpStatusCode.NotFound);
        }

        if (!await dbContext.Vehicles.AnyAsync(x => x.Id == vehicleId && x.BranchId == branchId, cancellationToken))
        {
            throw new AppException("Vehicle not found in this branch.", HttpStatusCode.NotFound);
        }

        if (!await dbContext.Employees.AnyAsync(x => x.Id == driverId && x.BranchId == branchId && x.EmployeeType == "DRIVER", cancellationToken))
        {
            throw new AppException("Driver not found in this branch.", HttpStatusCode.NotFound);
        }

        if (assistantId.HasValue && !await dbContext.Employees.AnyAsync(x => x.Id == assistantId && x.BranchId == branchId && x.EmployeeType == "ASSISTANT", cancellationToken))
        {
            throw new AppException("Assistant not found in this branch.", HttpStatusCode.NotFound);
        }
    }

    private static readonly Expression<Func<Trip, TripResponse>> ToResponseExpr = x => new TripResponse
    {
        Id = x.Id,
        BranchId = x.BranchId,
        TripCode = x.TripCode,
        RouteId = x.RouteId,
        RouteName = x.Route.Name,
        VehicleId = x.VehicleId,
        VehiclePlateNumber = x.Vehicle.PlateNumber,
        DriverId = x.DriverId,
        DriverName = x.Driver.FullName,
        AssistantId = x.AssistantId,
        AssistantName = x.Assistant != null ? x.Assistant.FullName : null,
        DepartureDate = x.DepartureDate,
        DepartureTime = x.DepartureTime,
        EstimatedArrivalTime = x.EstimatedArrivalTime,
        ActualDepartureAt = x.ActualDepartureAt,
        ActualArrivalAt = x.ActualArrivalAt,
        SeatCountSnapshot = x.SeatCountSnapshot,
        BaseTicketPriceSnapshot = x.BaseTicketPriceSnapshot,
        Status = x.Status,
        Notes = x.Notes,
        BookingOpenTime = x.BookingOpenTime,
        BookingCloseTime = x.BookingCloseTime,
        AllowOnlineBooking = x.AllowOnlineBooking
    };
}
