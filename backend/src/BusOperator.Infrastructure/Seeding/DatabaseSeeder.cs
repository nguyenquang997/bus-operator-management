using BusOperator.Domain.Entities;
using BusOperator.Domain.Enums;
using BusOperator.Infrastructure.Authentication;
using BusOperator.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace BusOperator.Infrastructure.Seeding;

public class DatabaseSeeder(
    AppDbContext dbContext,
    IPasswordHasher passwordHasher,
    IOptions<AdminSeedOptions> adminOptions,
    ILogger<DatabaseSeeder> logger)
{
    public async Task SeedAsync(CancellationToken cancellationToken = default)
    {
        await dbContext.Database.MigrateAsync(cancellationToken);

        var username = adminOptions.Value.Username.Trim();
        var password = adminOptions.Value.Password;
        var fullName = adminOptions.Value.FullName.Trim();
        var adminRole = await dbContext.Roles.FirstAsync(x => x.Code == AppRoles.Admin, cancellationToken);
        var existingUser = await dbContext.Users
            .Include(x => x.UserRoles)
            .FirstOrDefaultAsync(x => x.Username == username, cancellationToken);

        if (existingUser is not null)
        {
            var shouldUpdate = false;

            if (!existingUser.IsActive)
            {
                existingUser.IsActive = true;
                shouldUpdate = true;
            }

            if (!string.Equals(existingUser.FullName, fullName, StringComparison.Ordinal))
            {
                existingUser.FullName = fullName;
                shouldUpdate = true;
            }

            if (!passwordHasher.VerifyPassword(password, existingUser.PasswordHash))
            {
                existingUser.PasswordHash = passwordHasher.HashPassword(password);
                shouldUpdate = true;
            }

            var hasAdminRole = existingUser.UserRoles.Any(x => x.RoleId == adminRole.Id);
            if (!hasAdminRole)
            {
                dbContext.UserRoles.Add(new UserRole
                {
                    UserId = existingUser.Id,
                    RoleId = adminRole.Id,
                    CreatedAt = DateTime.UtcNow
                });
                shouldUpdate = true;
            }

            if (shouldUpdate)
            {
                await dbContext.SaveChangesAsync(cancellationToken);
                logger.LogInformation("Synchronized default admin user with username {Username}", username);
            }

            return;
        }

        var user = new User
        {
            BranchId = AppSeedData.DefaultBranchId,
            Username = username,
            PasswordHash = passwordHasher.HashPassword(password),
            FullName = fullName,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            CreatedBy = "SYSTEM"
        };

        dbContext.Users.Add(user);
        await dbContext.SaveChangesAsync(cancellationToken);

        dbContext.UserRoles.Add(new UserRole
        {
            UserId = user.Id,
            RoleId = adminRole.Id,
            CreatedAt = DateTime.UtcNow
        });

        await dbContext.SaveChangesAsync(cancellationToken);

        logger.LogInformation("Seeded default admin user with username {Username}", username);
    }
}
