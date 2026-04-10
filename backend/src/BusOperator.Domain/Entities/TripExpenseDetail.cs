using BusOperator.Domain.Common;

namespace BusOperator.Domain.Entities;

public class TripExpenseDetail : AuditableEntity
{
    public int Id { get; set; }
    public int TripExpenseId { get; set; }
    public int ExpenseTypeId { get; set; }
    public decimal Amount { get; set; }
    public string? Description { get; set; }

    public TripExpense TripExpense { get; set; } = null!;
    public ExpenseType ExpenseType { get; set; } = null!;
}
