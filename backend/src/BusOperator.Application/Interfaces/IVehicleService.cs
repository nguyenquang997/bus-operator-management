using BusOperator.Application.DTOs.Vehicles;

namespace BusOperator.Application.Interfaces;

public interface IVehicleService
{
    Task<IReadOnlyCollection<VehicleResponse>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<VehicleResponse> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<VehicleResponse> CreateAsync(VehicleCreateRequest request, CancellationToken cancellationToken = default);
    Task<VehicleResponse> UpdateAsync(int id, VehicleUpdateRequest request, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
}
