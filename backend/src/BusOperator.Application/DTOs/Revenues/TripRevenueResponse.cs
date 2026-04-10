namespace BusOperator.Application.DTOs.Revenues;

public class TripRevenueResponse
{
    public int Id { get; set; }
    public int TripId { get; set; }
    public string RevenueSourceType { get; set; } = string.Empty;
    public int? PassengerCountActual { get; set; }
    public decimal TotalAmount { get; set; }
    public bool IsFinalized { get; set; }
    public DateTime? FinalizedAt { get; set; }
    public string? FinalizedBy { get; set; }
    public string? Notes { get; set; }
    public IReadOnlyCollection<TripRevenueDetailResponse> Details { get; set; } = [];
}
