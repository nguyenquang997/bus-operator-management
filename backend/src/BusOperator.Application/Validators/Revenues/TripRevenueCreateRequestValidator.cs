using BusOperator.Application.DTOs.Revenues;
using FluentValidation;

namespace BusOperator.Application.Validators.Revenues;

public class TripRevenueCreateRequestValidator : AbstractValidator<TripRevenueCreateRequest>
{
    public TripRevenueCreateRequestValidator()
    {
        RuleFor(x => x.Details).NotEmpty();
        RuleForEach(x => x.Details).SetValidator(new TripRevenueDetailRequestValidator());
    }
}
