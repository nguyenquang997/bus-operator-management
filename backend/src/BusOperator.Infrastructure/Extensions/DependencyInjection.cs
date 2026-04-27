using BusOperator.Application.Interfaces;
using BusOperator.Infrastructure.Authentication;
using BusOperator.Infrastructure.Persistence;
using BusOperator.Infrastructure.Seeding;
using BusOperator.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BusOperator.Infrastructure.Extensions;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<JwtOptions>(configuration.GetSection("Jwt"));
        services.Configure<AdminSeedOptions>(configuration.GetSection("Seed:Admin"));

        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        services.AddHttpContextAccessor();

        services.AddScoped<ICurrentUserContext, CurrentUserContext>();
        services.AddScoped<IPasswordHasher, BcryptPasswordHasher>();
        services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();

        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<IRouteService, RouteService>();
        services.AddScoped<IVehicleService, VehicleService>();
        services.AddScoped<IEmployeeService, EmployeeService>();
        services.AddScoped<ITripService, TripService>();
        services.AddScoped<ITripRevenueService, TripRevenueService>();
        services.AddScoped<ITripExpenseService, TripExpenseService>();
        services.AddScoped<IDashboardService, DashboardService>();
        services.AddScoped<IReportService, ReportService>();
        services.AddScoped<IUserService, UserService>();

        services.AddScoped<DatabaseSeeder>();

        return services;
    }
}
