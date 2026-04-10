using System.Linq.Expressions;
using System.Net;
using BusOperator.Application.Common;
using BusOperator.Application.DTOs.Expenses;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Entities;
using BusOperator.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BusOperator.Infrastructure.Services;

public class TripExpenseService(AppDbContext dbContext, ICurrentUserContext currentUserContext) : ITripExpenseService
{
    public async Task<TripExpenseResponse?> GetByTripIdAsync(int tripId, CancellationToken cancellationToken = default)
    {
        return await dbContext.TripExpenses.AsNoTracking()
            .Where(x => x.TripId == tripId)
            .Select(ToResponseExpr)
            .FirstOrDefaultAsync(cancellationToken);
    }

    public async Task<TripExpenseResponse> CreateAsync(int tripId, TripExpenseCreateRequest request, CancellationToken cancellationToken = default)
    {
        if (!await dbContext.Trips.AnyAsync(x => x.Id == tripId, cancellationToken))
        {
            throw new AppException("Trip not found.", HttpStatusCode.NotFound);
        }

        if (await dbContext.TripExpenses.AnyAsync(x => x.TripId == tripId, cancellationToken))
        {
            throw new AppException("Trip expense already exists for this trip.", HttpStatusCode.Conflict);
        }

        var entity = new TripExpense
        {
            TripId = tripId,
            Notes = request.Notes,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = AuditHelper.Actor(currentUserContext)
        };

        entity.Details = request.Details.Select(x => new TripExpenseDetail
        {
            ExpenseTypeId = x.ExpenseTypeId,
            Amount = x.Amount,
            Description = x.Description,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = AuditHelper.Actor(currentUserContext)
        }).ToList();

        entity.TotalAmount = entity.Details.Sum(x => x.Amount);

        dbContext.TripExpenses.Add(entity);
        await dbContext.SaveChangesAsync(cancellationToken);

        return await GetByTripIdAsync(tripId, cancellationToken) ?? throw new AppException("Cannot load trip expense.");
    }

    public async Task<TripExpenseResponse> UpdateAsync(int tripId, TripExpenseUpdateRequest request, CancellationToken cancellationToken = default)
    {
        var entity = await dbContext.TripExpenses
            .Include(x => x.Details)
            .FirstOrDefaultAsync(x => x.TripId == tripId, cancellationToken)
            ?? throw new AppException("Trip expense not found.", HttpStatusCode.NotFound);

        dbContext.TripExpenseDetails.RemoveRange(entity.Details);

        entity.Notes = request.Notes;
        entity.UpdatedAt = DateTime.UtcNow;
        entity.UpdatedBy = AuditHelper.Actor(currentUserContext);
        entity.IsFinalized = request.IsFinalized;
        entity.FinalizedAt = request.IsFinalized ? DateTime.UtcNow : null;
        entity.FinalizedBy = request.IsFinalized ? AuditHelper.Actor(currentUserContext) : null;

        entity.Details = request.Details.Select(x => new TripExpenseDetail
        {
            ExpenseTypeId = x.ExpenseTypeId,
            Amount = x.Amount,
            Description = x.Description,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = AuditHelper.Actor(currentUserContext)
        }).ToList();

        entity.TotalAmount = entity.Details.Sum(x => x.Amount);

        await dbContext.SaveChangesAsync(cancellationToken);

        return await GetByTripIdAsync(tripId, cancellationToken) ?? throw new AppException("Cannot load trip expense.");
    }

    private static readonly Expression<Func<TripExpense, TripExpenseResponse>> ToResponseExpr = x => new TripExpenseResponse
    {
        Id = x.Id,
        TripId = x.TripId,
        TotalAmount = x.TotalAmount,
        IsFinalized = x.IsFinalized,
        FinalizedAt = x.FinalizedAt,
        FinalizedBy = x.FinalizedBy,
        Notes = x.Notes,
        Details = x.Details.Select(d => new TripExpenseDetailResponse
        {
            Id = d.Id,
            ExpenseTypeId = d.ExpenseTypeId,
            ExpenseTypeCode = d.ExpenseType.Code,
            Amount = d.Amount,
            Description = d.Description
        }).ToArray()
    };
}
