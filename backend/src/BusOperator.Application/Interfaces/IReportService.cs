using BusOperator.Application.DTOs.Reports;

namespace BusOperator.Application.Interfaces;

public interface IReportService
{
    Task<IReadOnlyCollection<TripReportResponse>> GetTripReportsAsync(CancellationToken cancellationToken = default);
}
