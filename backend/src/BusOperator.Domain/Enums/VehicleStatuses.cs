namespace BusOperator.Domain.Enums;

public static class VehicleStatuses
{
    public const string Active = "ACTIVE";
    public const string Maintenance = "MAINTENANCE";
    public const string Inactive = "INACTIVE";

    public static readonly string[] All = [Active, Maintenance, Inactive];
}
