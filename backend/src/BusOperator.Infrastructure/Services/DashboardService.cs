using BusOperator.Application.DTOs.Dashboard;
using BusOperator.Application.Interfaces;
using BusOperator.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BusOperator.Infrastructure.Services;

public class DashboardService(AppDbContext dbContext) : IDashboardService
{
    public async Task<DashboardSummaryResponse> GetSummaryAsync(CancellationToken cancellationToken = default)
    {
        var totalTrips = await dbContext.Trips.CountAsync(cancellationToken);
        var totalRevenue = await dbContext.TripRevenues.SumAsync(x => (decimal?)x.TotalAmount, cancellationToken) ?? 0;
        var totalExpense = await dbContext.TripExpenses.SumAsync(x => (decimal?)x.TotalAmount, cancellationToken) ?? 0;

        return new DashboardSummaryResponse
        {
            TotalTrips = totalTrips,
            TotalRevenue = totalRevenue,
            TotalExpense = totalExpense,
            Profit = totalRevenue - totalExpense
        };
    }
}
