namespace BusOperator.Application.DTOs.Vehicles;

public class VehicleResponse
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
    public bool IsActive { get; set; }
}
