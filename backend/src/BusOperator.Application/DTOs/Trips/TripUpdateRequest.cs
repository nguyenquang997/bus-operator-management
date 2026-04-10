namespace BusOperator.Application.DTOs.Trips;

public class TripUpdateRequest
{
    public int RouteId { get; set; }
    public int VehicleId { get; set; }
    public int DriverId { get; set; }
    public int? AssistantId { get; set; }
    public DateOnly DepartureDate { get; set; }
    public TimeOnly DepartureTime { get; set; }
    public TimeOnly? EstimatedArrivalTime { get; set; }
    public DateTime? BookingOpenTime { get; set; }
    public DateTime? BookingCloseTime { get; set; }
    public bool AllowOnlineBooking { get; set; }
    public string? Notes { get; set; }
}
