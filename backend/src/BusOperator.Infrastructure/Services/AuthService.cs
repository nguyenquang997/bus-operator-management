using System.Net;
using BusOperator.Application.Common;
using BusOperator.Application.DTOs.Auth;
using BusOperator.Application.Interfaces;
using BusOperator.Infrastructure.Authentication;
using BusOperator.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BusOperator.Infrastructure.Services;

public class AuthService(
    AppDbContext dbContext,
    IPasswordHasher passwordHasher,
    IJwtTokenGenerator jwtTokenGenerator) : IAuthService
{
    public async Task<LoginResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        var user = await dbContext.Users
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Role)
            .FirstOrDefaultAsync(x => x.Username == request.Username, cancellationToken);

        if (user is null || !user.IsActive || !passwordHasher.VerifyPassword(request.Password, user.PasswordHash))
        {
            throw new AppException("Invalid username or password.", HttpStatusCode.Unauthorized);
        }

        var roles = user.UserRoles
            .Where(x => x.Role.IsActive)
            .Select(x => x.Role.Code)
            .Distinct()
            .ToArray();

        var (token, expiresAt) = jwtTokenGenerator.Generate(user, roles);
        user.LastLoginAt = DateTime.UtcNow;
        await dbContext.SaveChangesAsync(cancellationToken);

        return new LoginResponse
        {
            AccessToken = token,
            ExpiresAt = expiresAt,
            User = new UserMeResponse
            {
                Id = user.Id,
                Username = user.Username,
                FullName = user.FullName,
                Roles = roles
            }
        };
    }

    public async Task<UserMeResponse> GetCurrentUserAsync(int userId, CancellationToken cancellationToken = default)
    {
        var user = await dbContext.Users
            .Include(x => x.UserRoles)
            .ThenInclude(x => x.Role)
            .FirstOrDefaultAsync(x => x.Id == userId, cancellationToken)
            ?? throw new AppException("User not found.", HttpStatusCode.NotFound);

        return new UserMeResponse
        {
            Id = user.Id,
            Username = user.Username,
            FullName = user.FullName,
            Roles = user.UserRoles.Select(x => x.Role.Code).Distinct().ToArray()
        };
    }
}
