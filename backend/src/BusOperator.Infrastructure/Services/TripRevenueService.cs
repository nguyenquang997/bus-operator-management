using System.Linq.Expressions;
using System.Net;
using BusOperator.Application.Common;
using BusOperator.Application.DTOs.Revenues;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Entities;
using BusOperator.Domain.Enums;
using BusOperator.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BusOperator.Infrastructure.Services;

public class TripRevenueService(AppDbContext dbContext, ICurrentUserContext currentUserContext) : ITripRevenueService
{
    public async Task<TripRevenueResponse?> GetByTripIdAsync(int tripId, CancellationToken cancellationToken = default)
    {
        return await dbContext.TripRevenues.AsNoTracking()
            .Where(x => x.TripId == tripId)
            .Select(ToResponseExpr)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<TripRevenueResponse> CreateAsync(int tripId, TripRevenueCreateRequest request, CancellationToken cancellationToken = default)
    {
        if (!await dbContext.Trips.AnyAsync(x => x.Id == tripId, cancellationToken))
        {
            throw new AppException("Trip not found.", HttpStatusCode.NotFound);
        }

        if (await dbContext.TripRevenues.AnyAsync(x => x.TripId == tripId, cancellationToken))
        {
            throw new AppException("Trip revenue already exists for this trip.", HttpStatusCode.Conflict);
        }

        var entity = new TripRevenue
        {
            TripId = tripId,
            RevenueSourceType = string.IsNullOrWhiteSpace(request.RevenueSourceType) ? RevenueSourceTypes.Manual : request.RevenueSourceType,
            PassengerCountActual = request.PassengerCountActual,
            Notes = request.Notes,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = AuditHelper.Actor(currentUserContext)
        };

        entity.Details = request.Details.Select(x => new TripRevenueDetail
        {
            RevenueTypeId = x.RevenueTypeId,
            Amount = x.Amount,
            Description = x.Description,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = AuditHelper.Actor(currentUserContext)
        }).ToList();

        entity.TotalAmount = entity.Details.Sum(x => x.Amount);

        dbContext.TripRevenues.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return await GetByTripIdAsync(tripId, cancellationToken) ?? throw new AppException("Cannot load trip revenue.");
    }

    public async Task<TripRevenueResponse> UpdateAsync(int tripId, TripRevenueUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var entity = await dbContext.TripRevenues
            .Include(x => x.Details)
            .FirstOrDefaultAsync(x => x.TripId == tripId, cancellationToken)
            ?? throw new AppException("Trip revenue not found.", HttpStatusCode.NotFound);

        dbContext.TripRevenueDetails.RemoveRange(entity.Details);

        entity.RevenueSourceType = string.IsNullOrWhiteSpace(request.RevenueSourceType) ? RevenueSourceTypes.Manual : request.RevenueSourceType;
        entity.PassengerCountActual = request.PassengerCountActual;
        entity.Notes = request.Notes;
        entity.UpdatedAt = DateTime.UtcNow;
        entity.UpdatedBy = AuditHelper.Actor(currentUserContext);
        entity.IsFinalized = request.IsFinalized;
        entity.FinalizedAt = request.IsFinalized ? DateTime.UtcNow : null;
        entity.FinalizedBy = request.IsFinalized ? AuditHelper.Actor(currentUserContext) : null;

        entity.Details = request.Details.Select(x => new TripRevenueDetail
        {
            RevenueTypeId = x.RevenueTypeId,
            Amount = x.Amount,
            Description = x.Description,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = AuditHelper.Actor(currentUserContext)
        }).ToList();

        entity.TotalAmount = entity.Details.Sum(x => x.Amount);

        await dbContext.SaveChangesAsync(cancellationToken);
        return await GetByTripIdAsync(tripId, cancellationToken) ?? throw new AppException("Cannot load trip revenue.");
    }

    private static readonly Expression<Func<TripRevenue, TripRevenueResponse>> ToResponseExpr = x => new TripRevenueResponse
    {
        Id = x.Id,
        TripId = x.TripId,
        RevenueSourceType = x.RevenueSourceType,
        PassengerCountActual = x.PassengerCountActual,
        TotalAmount = x.TotalAmount,
        IsFinalized = x.IsFinalized,
        FinalizedAt = x.FinalizedAt,
        FinalizedBy = x.FinalizedBy,
        Notes = x.Notes,
        Details = x.Details.Select(d => new TripRevenueDetailResponse
        {
            Id = d.Id,
            RevenueTypeId = d.RevenueTypeId,
            RevenueTypeCode = d.RevenueType.Code,
            Amount = d.Amount,
            Description = d.Description
        }).ToArray()
    };
}


