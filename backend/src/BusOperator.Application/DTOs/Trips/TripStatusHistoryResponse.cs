namespace BusOperator.Application.DTOs.Trips;

public class TripStatusHistoryResponse
{
    public int Id { get; set; }
    public int TripId { get; set; }
    public string OldStatus { get; set; } = string.Empty;
    public string NewStatus { get; set; } = string.Empty;
    public DateTime ChangedAt { get; set; }
    public int? ChangedBy { get; set; }
    public string? Note { get; set; }
}
