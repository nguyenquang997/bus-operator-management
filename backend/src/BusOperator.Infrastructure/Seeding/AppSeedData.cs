using BusOperator.Domain.Enums;

namespace BusOperator.Infrastructure.Seeding;

public static class AppSeedData
{
    public const int DefaultBranchId = 1;

    public static readonly object[] Roles =
    [
        new { Id = 1, Code = AppRoles.Admin, Name = "Administrator", Description = "System administrator", IsActive = true },
        new { Id = 2, Code = AppRoles.Operator, Name = "Operator", Description = "Operator role", IsActive = true },
        new { Id = 3, Code = AppRoles.Accountant, Name = "Accountant", Description = "Accountant role", IsActive = true },
        new { Id = 4, Code = AppRoles.Staff, Name = "Staff", Description = "Staff role", IsActive = true }
    ];

    public static readonly object[] RevenueTypes =
    [
        new { Id = 1, Code = "PASSENGER_TICKET", Name = "Passenger Ticket", IsSystem = true, IsActive = true },
        new { Id = 2, Code = "CARGO", Name = "Cargo", IsSystem = true, IsActive = true },
        new { Id = 3, Code = "SHUTTLE", Name = "Shuttle", IsSystem = true, IsActive = true },
        new { Id = 4, Code = "OTHER", Name = "Other", IsSystem = true, IsActive = true }
    ];

    public static readonly object[] ExpenseTypes =
    [
        new { Id = 1, Code = "FUEL", Name = "Fuel", IsSystem = true, IsActive = true },
        new { Id = 2, Code = "DRIVER_SALARY", Name = "Driver Salary", IsSystem = true, IsActive = true },
        new { Id = 3, Code = "ASSISTANT_SALARY", Name = "Assistant Salary", IsSystem = true, IsActive = true },
        new { Id = 4, Code = "TOLL", Name = "Toll", IsSystem = true, IsActive = true },
        new { Id = 5, Code = "PARKING", Name = "Parking", IsSystem = true, IsActive = true },
        new { Id = 6, Code = "FOOD", Name = "Food", IsSystem = true, IsActive = true },
        new { Id = 7, Code = "OTHER", Name = "Other", IsSystem = true, IsActive = true }
    ];
}
