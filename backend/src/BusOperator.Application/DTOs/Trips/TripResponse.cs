namespace BusOperator.Application.DTOs.Trips;

public class TripResponse
{
    public int Id { get; set; }
    public int BranchId { get; set; }
    public string TripCode { get; set; } = string.Empty;
    public int RouteId { get; set; }
    public string RouteName { get; set; } = string.Empty;
    public int VehicleId { get; set; }
    public string VehiclePlateNumber { get; set; } = string.Empty;
    public int DriverId { get; set; }
    public string DriverName { get; set; } = string.Empty;
    public int? AssistantId { get; set; }
    public string? AssistantName { get; set; }
    public DateOnly DepartureDate { get; set; }
    public TimeOnly DepartureTime { get; set; }
    public TimeOnly? EstimatedArrivalTime { get; set; }
    public DateTime? ActualDepartureAt { get; set; }
    public DateTime? ActualArrivalAt { get; set; }
    public int SeatCountSnapshot { get; set; }
    public decimal BaseTicketPriceSnapshot { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public DateTime? BookingOpenTime { get; set; }
    public DateTime? BookingCloseTime { get; set; }
    public bool AllowOnlineBooking { get; set; }
}
