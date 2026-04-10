using BusOperator.Application.DTOs.Expenses;

namespace BusOperator.Application.Interfaces;

public interface ITripExpenseService
{
    Task<TripExpenseResponse?> GetByTripIdAsync(int tripId, CancellationToken cancellationToken = default);
    Task<TripExpenseResponse> CreateAsync(int tripId, TripExpenseCreateRequest request, CancellationToken cancellationToken = default);
    Task<TripExpenseResponse> UpdateAsync(int tripId, TripExpenseUpdateRequest request, CancellationToken cancellationToken = default);
}
