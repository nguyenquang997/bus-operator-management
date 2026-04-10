namespace BusOperator.Application.DTOs.Expenses;

public class TripExpenseCreateRequest
{
    public string? Notes { get; set; }
    public IReadOnlyCollection<TripExpenseDetailRequest> Details { get; set; } = [];
}
