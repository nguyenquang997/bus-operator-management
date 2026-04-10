namespace BusOperator.Domain.Enums;

public static class EmployeeTypes
{
    public const string Driver = "DRIVER";
    public const string Assistant = "ASSISTANT";
    public const string Operator = "OPERATOR";
    public const string Accountant = "ACCOUNTANT";

    public static readonly string[] All = [Driver, Assistant, Operator, Accountant];
}
