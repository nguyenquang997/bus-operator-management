using BusOperator.Application.DTOs.Expenses;
using FluentValidation;

namespace BusOperator.Application.Validators.Expenses;

public class TripExpenseUpdateRequestValidator : AbstractValidator<TripExpenseUpdateRequest>
{
    public TripExpenseUpdateRequestValidator()
    {
        Include(new TripExpenseCreateRequestValidator());
    }
}
