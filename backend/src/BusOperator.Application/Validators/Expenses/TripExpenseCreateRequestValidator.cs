using BusOperator.Application.DTOs.Expenses;
using FluentValidation;

namespace BusOperator.Application.Validators.Expenses;

public class TripExpenseCreateRequestValidator : AbstractValidator<TripExpenseCreateRequest>
{
    public TripExpenseCreateRequestValidator()
    {
        RuleFor(x => x.Details).NotEmpty();
        RuleForEach(x => x.Details).SetValidator(new TripExpenseDetailRequestValidator());
    }
}
