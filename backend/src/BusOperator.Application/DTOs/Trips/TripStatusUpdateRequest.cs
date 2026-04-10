namespace BusOperator.Application.DTOs.Trips;

public class TripStatusUpdateRequest
{
    public string Status { get; set; } = string.Empty;
    public string? Note { get; set; }
}
