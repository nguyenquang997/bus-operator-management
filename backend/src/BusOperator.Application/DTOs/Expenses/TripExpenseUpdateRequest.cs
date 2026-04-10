namespace BusOperator.Application.DTOs.Expenses;

public class TripExpenseUpdateRequest : TripExpenseCreateRequest
{
    public bool IsFinalized { get; set; }
}
