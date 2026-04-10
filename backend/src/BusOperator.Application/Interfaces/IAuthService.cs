using BusOperator.Application.DTOs.Auth;

namespace BusOperator.Application.Interfaces;

public interface IAuthService
{
    Task<LoginResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default);
    Task<UserMeResponse> GetCurrentUserAsync(int userId, CancellationToken cancellationToken = default);
}
