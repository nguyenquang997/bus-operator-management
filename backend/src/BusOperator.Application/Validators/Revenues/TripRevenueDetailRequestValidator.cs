using BusOperator.Application.DTOs.Revenues;
using FluentValidation;

namespace BusOperator.Application.Validators.Revenues;

public class TripRevenueDetailRequestValidator : AbstractValidator<TripRevenueDetailRequest>
{
    public TripRevenueDetailRequestValidator()
    {
        RuleFor(x => x.RevenueTypeId).GreaterThan(0);
        RuleFor(x => x.Amount).GreaterThanOrEqualTo(0);
    }
}
