namespace BusOperator.Application.DTOs.Expenses;

public class TripExpenseDetailRequest
{
    public int ExpenseTypeId { get; set; }
    public decimal Amount { get; set; }
    public string? Description { get; set; }
}
