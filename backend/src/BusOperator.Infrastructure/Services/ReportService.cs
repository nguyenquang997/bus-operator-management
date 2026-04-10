using BusOperator.Application.DTOs.Reports;
using BusOperator.Application.Interfaces;
using BusOperator.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BusOperator.Infrastructure.Services;

public class ReportService(AppDbContext dbContext) : IReportService
{
    public async Task<IReadOnlyCollection<TripReportResponse>> GetTripReportsAsync(CancellationToken cancellationToken = default)
    {
        var data = await dbContext.Trips
            .AsNoTracking()
            .Select(x => new TripReportResponse
            {
                TripId = x.Id,
                TripCode = x.TripCode,
                RouteName = x.Route.Name,
                VehiclePlateNumber = x.Vehicle.PlateNumber,
                DriverName = x.Driver.FullName,
                DepartureDate = x.DepartureDate,
                Status = x.Status,
                TotalRevenue = x.TripRevenue != null ? x.TripRevenue.TotalAmount : 0,
                TotalExpense = x.TripExpense != null ? x.TripExpense.TotalAmount : 0,
                Profit = (x.TripRevenue != null ? x.TripRevenue.TotalAmount : 0) - (x.TripExpense != null ? x.TripExpense.TotalAmount : 0)
            })
            .OrderByDescending(x => x.DepartureDate)
            .ThenByDescending(x => x.TripId)
            .ToListAsync(cancellationToken);

        return data;
    }
}
