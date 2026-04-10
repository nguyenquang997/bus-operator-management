namespace BusOperator.Domain.Enums;

public static class AppRoles
{
    public const string Admin = "ADMIN";
    public const string Operator = "OPERATOR";
    public const string Accountant = "ACCOUNTANT";
    public const string Staff = "STAFF";

    public static readonly string[] All = [Admin, Operator, Accountant, Staff];
}
