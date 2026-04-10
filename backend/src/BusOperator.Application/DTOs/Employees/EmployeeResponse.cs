namespace BusOperator.Application.DTOs.Employees;

public class EmployeeResponse
{
    public int Id { get; set; }
    public int BranchId { get; set; }
    public string Code { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string EmployeeType { get; set; } = string.Empty;
    public string? LicenseNumber { get; set; }
    public string? LicenseClass { get; set; }
    public DateTime? HireDate { get; set; }
    public string Status { get; set; } = string.Empty;
    public bool IsActive { get; set; }
}
