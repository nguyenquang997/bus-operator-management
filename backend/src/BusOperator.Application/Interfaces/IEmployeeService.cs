using BusOperator.Application.DTOs.Employees;

namespace BusOperator.Application.Interfaces;

public interface IEmployeeService
{
    Task<IReadOnlyCollection<EmployeeResponse>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<EmployeeResponse> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<EmployeeResponse> CreateAsync(EmployeeCreateRequest request, CancellationToken cancellationToken = default);
    Task<EmployeeResponse> UpdateAsync(int id, EmployeeUpdateRequest request, CancellationToken cancellationToken = default);
    Task DeleteAsync(int id, CancellationToken cancellationToken = default);
}
