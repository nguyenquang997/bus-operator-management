using BusOperator.Application.DTOs.Routes;

namespace BusOperator.Application.Interfaces;

public interface IRouteService
{
    Task<IReadOnlyCollection<RouteResponse>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<RouteResponse> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<RouteResponse> CreateAsync(RouteCreateRequest request, CancellationToken cancellationToken = default);
    Task<RouteResponse> UpdateAsync(int id, RouteUpdateRequest request, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);

    Task<IReadOnlyCollection<RouteStopResponse>> GetStopsAsync(int routeId, CancellationToken cancellationToken = default);
    Task<RouteStopResponse> CreateStopAsync(int routeId, RouteStopCreateRequest request, CancellationToken cancellationToken = default);
    Task<RouteStopResponse> UpdateStopAsync(int id, RouteStopUpdateRequest request, CancellationToken cancellationToken = default);
    Task DeleteStopAsync(int id, CancellationToken cancellationToken = default);
}
