namespace BusOperator.Application.DTOs.Employees;

public class EmployeeCreateRequest
{
    public int BranchId { get; set; }
    public string Code { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string EmployeeType { get; set; } = string.Empty;
    public string? LicenseNumber { get; set; }
    public string? LicenseClass { get; set; }
    public DateTime? HireDate { get; set; }
    public string Status { get; set; } = "ACTIVE";
    public bool IsActive { get; set; } = true;
}
