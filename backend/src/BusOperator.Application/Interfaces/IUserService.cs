using BusOperator.Application.DTOs.Users;

namespace BusOperator.Application.Interfaces;

public interface IUserService
{
    Task<UserResponse> CreateAsync(UserCreateRequest request, CancellationToken cancellationToken = default);
}
