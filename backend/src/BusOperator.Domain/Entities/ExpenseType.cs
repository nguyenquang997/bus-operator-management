namespace BusOperator.Domain.Entities;

public class ExpenseType
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool IsSystem { get; set; } = true;
    public bool IsActive { get; set; } = true;

    public ICollection<TripExpenseDetail> TripExpenseDetails { get; set; } = new List<TripExpenseDetail>();
}
