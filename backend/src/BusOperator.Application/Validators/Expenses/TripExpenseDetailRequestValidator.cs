using BusOperator.Application.DTOs.Expenses;
using FluentValidation;

namespace BusOperator.Application.Validators.Expenses;

public class TripExpenseDetailRequestValidator : AbstractValidator<TripExpenseDetailRequest>
{
    public TripExpenseDetailRequestValidator()
    {
        RuleFor(x => x.ExpenseTypeId).GreaterThan(0);
        RuleFor(x => x.Amount).GreaterThanOrEqualTo(0);
    }
}
