using BusOperator.Application.DTOs.Revenues;

namespace BusOperator.Application.Interfaces;

public interface ITripRevenueService
{
    Task<TripRevenueResponse?> GetByTripIdAsync(int tripId, CancellationToken cancellationToken = default);
    Task<TripRevenueResponse> CreateAsync(int tripId, TripRevenueCreateRequest request, CancellationToken cancellationToken = default);
    Task<TripRevenueResponse> UpdateAsync(int tripId, TripRevenueUpdateRequest request, CancellationToken cancellationToken = default);
}
