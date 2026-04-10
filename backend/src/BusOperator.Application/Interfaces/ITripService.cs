using BusOperator.Application.DTOs.Trips;

namespace BusOperator.Application.Interfaces;

public interface ITripService
{
    Task<IReadOnlyCollection<TripResponse>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<TripResponse> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<TripResponse> CreateAsync(TripCreateRequest request, CancellationToken cancellationToken = default);
    Task<TripResponse> UpdateAsync(int id, TripUpdateRequest request, CancellationToken cancellationToken = default);
    Task<TripResponse> UpdateStatusAsync(int id, TripStatusUpdateRequest request, CancellationToken cancellationToken = default);
}
