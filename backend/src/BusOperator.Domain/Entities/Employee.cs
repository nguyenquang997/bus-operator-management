using BusOperator.Domain.Common;

namespace BusOperator.Domain.Entities;

public class Employee : AuditableEntity
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
    public string Status { get; set; } = "ACTIVE";
    public bool IsActive { get; set; } = true;

    public Branch Branch { get; set; } = null!;
    public ICollection<Trip> DriverTrips { get; set; } = new List<Trip>();
    public ICollection<Trip> AssistantTrips { get; set; } = new List<Trip>();
}
