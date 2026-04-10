namespace BusOperator.Domain.Entities;

public class TripStatusHistory
{
    public int Id { get; set; }
    public int TripId { get; set; }
    public string OldStatus { get; set; } = string.Empty;
    public string NewStatus { get; set; } = string.Empty;
    public DateTime ChangedAt { get; set; } = DateTime.UtcNow;
    public int? ChangedBy { get; set; }
    public string? Note { get; set; }

    public Trip Trip { get; set; } = null!;
    public User? ChangedByUser { get; set; }
}
