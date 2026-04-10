namespace BusOperator.Application.DTOs.Expenses;

public class TripExpenseDetailResponse
{
    public int Id { get; set; }
    public int ExpenseTypeId { get; set; }
    public string ExpenseTypeCode { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string? Description { get; set; }
}
