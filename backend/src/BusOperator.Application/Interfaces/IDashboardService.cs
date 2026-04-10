using BusOperator.Application.DTOs.Dashboard;

namespace BusOperator.Application.Interfaces;

public interface IDashboardService
{
    Task<DashboardSummaryResponse> GetSummaryAsync(CancellationToken cancellationToken = default);
}
