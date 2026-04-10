using BusOperator.Application.DTOs.Revenues;
using FluentValidation;

namespace BusOperator.Application.Validators.Revenues;

public class TripRevenueUpdateRequestValidator : AbstractValidator<TripRevenueUpdateRequest>
{
    public TripRevenueUpdateRequestValidator()
    {
        Include(new TripRevenueCreateRequestValidator());
    }
}
