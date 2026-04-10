using BusOperator.Infrastructure.Authentication;

namespace BusOperator.Infrastructure.Seeding;

public class AdminSeedOptions
{
    public string Username { get; set; } = "admin";
    public string Password { get; set; } = "Admin@123";
    public string FullName { get; set; } = "System Admin";
}
