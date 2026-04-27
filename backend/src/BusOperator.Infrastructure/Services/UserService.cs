using System.Net;
using BusOperator.Application.Common;
using BusOperator.Application.DTOs.Users;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Entities;
using BusOperator.Infrastructure.Authentication;
using BusOperator.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace BusOperator.Infrastructure.Services;

public class UserService(
    AppDbContext dbContext,
    IPasswordHasher passwordHasher,
    ICurrentUserContext currentUserContext) : IUserService
{
    public async Task<UserResponse> CreateAsync(UserCreateRequest request, CancellationToken cancellationToken = default)
    {
        var username = request.Username.Trim();
        if (await dbContext.Users.AnyAsync(x => x.Username == username, cancellationToken))
        {
            throw new AppException("Username already exists.", HttpStatusCode.Conflict);
        }

        if (!await dbContext.Branches.AnyAsync(x => x.Id == request.BranchId, cancellationToken))
        {
            throw new AppException("Branch not found.", HttpStatusCode.NotFound);
        }

        var normalizedRoleCodes = request.RoleCodes
            .Select(x => x.Trim().ToUpperInvariant())
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Distinct()
            .ToArray();

        if (normalizedRoleCodes.Length == 0)
        {
            throw new AppException("At least one role is required.", HttpStatusCode.BadRequest);
        }

        var roles = await dbContext.Roles
            .Where(x => normalizedRoleCodes.Contains(x.Code) && x.IsActive)
            .ToListAsync(cancellationToken);

        if (roles.Count != normalizedRoleCodes.Length)
        {
            throw new AppException("One or more role codes are invalid.", HttpStatusCode.BadRequest);
        }

        var user = new User
        {
            BranchId = request.BranchId,
            Username = username,
            PasswordHash = passwordHasher.HashPassword(request.Password),
            FullName = request.FullName.Trim(),
            Email = string.IsNullOrWhiteSpace(request.Email) ? null : request.Email.Trim(),
            PhoneNumber = string.IsNullOrWhiteSpace(request.PhoneNumber) ? null : request.PhoneNumber.Trim(),
            IsActive = request.IsActive,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = AuditHelper.Actor(currentUserContext)
        };

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync(cancellationToken);

        foreach (var role in roles)
        {
            dbContext.UserRoles.Add(new UserRole
            {
                UserId = user.Id,
                RoleId = role.Id,
                CreatedAt = DateTime.UtcNow
            });
        }

        await dbContext.SaveChangesAsync(cancellationToken);

        return new UserResponse
        {
            Id = user.Id,
            BranchId = user.BranchId,
            Username = user.Username,
            FullName = user.FullName,
            Email = user.Email,
            PhoneNumber = user.PhoneNumber,
            IsActive = user.IsActive,
            Roles = roles.Select(x => x.Code).OrderBy(x => x).ToArray()
        };
    }
}
