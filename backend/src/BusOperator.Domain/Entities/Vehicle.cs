using BusOperator.Domain.Common;

namespace BusOperator.Domain.Entities;

public class Vehicle : AuditableEntity
{
    public int Id { get; set; }
    public int BranchId { get; set; }
    public string Code { get; set; } = string.Empty;
    public string PlateNumber { get; set; } = string.Empty;
    public string VehicleType { get; set; } = string.Empty;
    public string? Brand { get; set; }
    public string? Model { get; set; }
    public int SeatCount { get; set; }
    public int? YearOfManufacture { get; set; }
    public string Status { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;

    public Branch Branch { get; set; } = null!;
    public ICollection<Trip> Trips { get; set; } = new List<Trip>();
}
