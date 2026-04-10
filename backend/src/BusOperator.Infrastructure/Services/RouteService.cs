using System.Linq.Expressions;
using System.Net;
using BusOperator.Application.Common;
using BusOperator.Application.DTOs.Routes;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Entities;
using BusOperator.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BusOperator.Infrastructure.Services;

public class RouteService(AppDbContext dbContext, ICurrentUserContext currentUserContext) : IRouteService
{
    public async Task<IReadOnlyCollection<RouteResponse>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        return await dbContext.Routes
            .AsNoTracking()
            .OrderBy(x => x.Name)
            .Select(x => new RouteResponse
            {
                Id = x.Id,
                Code = x.Code,
                Name = x.Name,
                FromLocation = x.FromLocation,
                ToLocation = x.ToLocation,
                DistanceKm = x.DistanceKm,
                EstimatedDurationMinutes = x.EstimatedDurationMinutes,
                BaseTicketPrice = x.BaseTicketPrice,
                IsActive = x.IsActive
            }).ToListAsync(cancellationToken);
    }

    public async Task<RouteResponse> GetByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        var route = await dbContext.Routes
            .AsNoTracking()
            .Include(x => x.Stops.OrderBy(s => s.StopOrder))
            .FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
            ?? throw new AppException("Route not found.", HttpStatusCode.NotFound);

        return ToResponse(route);
    }

    public async Task<RouteResponse> CreateAsync(RouteCreateRequest request, CancellationToken cancellationToken = default)
    {
        if (await dbContext.Routes.AnyAsync(x => x.Code == request.Code, cancellationToken))
        {
            throw new AppException("Route code already exists.", HttpStatusCode.Conflict);
        }

        var route = new Route
        {
            Code = request.Code,
            Name = request.Name,
            FromLocation = request.FromLocation,
            ToLocation = request.ToLocation,
            DistanceKm = request.DistanceKm,
            EstimatedDurationMinutes = request.EstimatedDurationMinutes,
            BaseTicketPrice = request.BaseTicketPrice,
            IsActive = request.IsActive,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = AuditHelper.Actor(currentUserContext)
        };

        dbContext.Routes.Add(route);
        await dbContext.SaveChangesAsync(cancellationToken);

        return await GetByIdAsync(route.Id, cancellationToken);
    }

    public async Task<RouteResponse> UpdateAsync(int id, RouteUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var route = await dbContext.Routes.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
            ?? throw new AppException("Route not found.", HttpStatusCode.NotFound);

        if (await dbContext.Routes.AnyAsync(x => x.Id != id && x.Code == request.Code, cancellationToken))
        {
            throw new AppException("Route code already exists.", HttpStatusCode.Conflict);
        }

        route.Code = request.Code;
        route.Name = request.Name;
        route.FromLocation = request.FromLocation;
        route.ToLocation = request.ToLocation;
        route.DistanceKm = request.DistanceKm;
        route.EstimatedDurationMinutes = request.EstimatedDurationMinutes;
        route.BaseTicketPrice = request.BaseTicketPrice;
        route.IsActive = request.IsActive;
        route.UpdatedAt = DateTime.UtcNow;
        route.UpdatedBy = AuditHelper.Actor(currentUserContext);

        await dbContext.SaveChangesAsync(cancellationToken);
        return await GetByIdAsync(route.Id, cancellationToken);
    }

    public async Task DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var route = await dbContext.Routes.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
            ?? throw new AppException("Route not found.", HttpStatusCode.NotFound);

        dbContext.Routes.Remove(route);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<IReadOnlyCollection<RouteStopResponse>> GetStopsAsync(int routeId, CancellationToken cancellationToken = default)
    {
        if (!await dbContext.Routes.AnyAsync(x => x.Id == routeId, cancellationToken))
        {
            throw new AppException("Route not found.", HttpStatusCode.NotFound);
        }

        return await dbContext.RouteStops
            .AsNoTracking()
            .Where(x => x.RouteId == routeId)
            .OrderBy(x => x.StopOrder)
            .Select(ToStopResponseExpr)
            .ToListAsync(cancellationToken);
    }

    public async Task<RouteStopResponse> CreateStopAsync(int routeId, RouteStopCreateRequest request, CancellationToken cancellationToken = default)
    {
        if (!await dbContext.Routes.AnyAsync(x => x.Id == routeId, cancellationToken))
        {
            throw new AppException("Route not found.", HttpStatusCode.NotFound);
        }

        if (await dbContext.RouteStops.AnyAsync(x => x.RouteId == routeId && x.StopOrder == request.StopOrder, cancellationToken))
        {
            throw new AppException("StopOrder already exists in this route.", HttpStatusCode.Conflict);
        }

        var stop = new RouteStop
        {
            RouteId = routeId,
            StopOrder = request.StopOrder,
            StopName = request.StopName,
            Address = request.Address,
            StopType = request.StopType,
            EstimatedOffsetMinutes = request.EstimatedOffsetMinutes,
            IsActive = request.IsActive
        };

        dbContext.RouteStops.Add(stop);
        await dbContext.SaveChangesAsync(cancellationToken);

        return await dbContext.RouteStops
            .AsNoTracking()
            .Where(x => x.Id == stop.Id)
            .Select(ToStopResponseExpr)
            .FirstAsync(cancellationToken);
    }

    public async Task<RouteStopResponse> UpdateStopAsync(int id, RouteStopUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var stop = await dbContext.RouteStops.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
            ?? throw new AppException("Route stop not found.", HttpStatusCode.NotFound);

        if (await dbContext.RouteStops.AnyAsync(x => x.Id != id && x.RouteId == stop.RouteId && x.StopOrder == request.StopOrder, cancellationToken))
        {
            throw new AppException("StopOrder already exists in this route.", HttpStatusCode.Conflict);
        }

        stop.StopOrder = request.StopOrder;
        stop.StopName = request.StopName;
        stop.Address = request.Address;
        stop.StopType = request.StopType;
        stop.EstimatedOffsetMinutes = request.EstimatedOffsetMinutes;
        stop.IsActive = request.IsActive;

        await dbContext.SaveChangesAsync(cancellationToken);

        return await dbContext.RouteStops
            .AsNoTracking()
            .Where(x => x.Id == id)
            .Select(ToStopResponseExpr)
            .FirstAsync(cancellationToken);
    }

    public async Task DeleteStopAsync(int id, CancellationToken cancellationToken = default)
    {
        var stop = await dbContext.RouteStops.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)
            ?? throw new AppException("Route stop not found.", HttpStatusCode.NotFound);

        dbContext.RouteStops.Remove(stop);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    private static RouteResponse ToResponse(Route route)
    {
        return new RouteResponse
        {
            Id = route.Id,
            Code = route.Code,
            Name = route.Name,
            FromLocation = route.FromLocation,
            ToLocation = route.ToLocation,
            DistanceKm = route.DistanceKm,
            EstimatedDurationMinutes = route.EstimatedDurationMinutes,
            BaseTicketPrice = route.BaseTicketPrice,
            IsActive = route.IsActive,
            Stops = route.Stops.OrderBy(x => x.StopOrder).Select(ToStopResponse).ToArray()
        };
    }

    private static readonly Expression<Func<RouteStop, RouteStopResponse>> ToStopResponseExpr = x => new RouteStopResponse
    {
        Id = x.Id,
        RouteId = x.RouteId,
        StopOrder = x.StopOrder,
        StopName = x.StopName,
        Address = x.Address,
        StopType = x.StopType,
        EstimatedOffsetMinutes = x.EstimatedOffsetMinutes,
        IsActive = x.IsActive
    };

    private static RouteStopResponse ToStopResponse(RouteStop x) => new()
    {
        Id = x.Id,
        RouteId = x.RouteId,
        StopOrder = x.StopOrder,
        StopName = x.StopName,
        Address = x.Address,
        StopType = x.StopType,
        EstimatedOffsetMinutes = x.EstimatedOffsetMinutes,
        IsActive = x.IsActive
    };
}


