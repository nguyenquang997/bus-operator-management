namespace BusOperator.Application.DTOs.Expenses;

public class TripExpenseResponse
{
    public int Id { get; set; }
    public int TripId { get; set; }
    public decimal TotalAmount { get; set; }
    public bool IsFinalized { get; set; }
    public DateTime? FinalizedAt { get; set; }
    public string? FinalizedBy { get; set; }
    public string? Notes { get; set; }
    public IReadOnlyCollection<TripExpenseDetailResponse> Details { get; set; } = [];
}
