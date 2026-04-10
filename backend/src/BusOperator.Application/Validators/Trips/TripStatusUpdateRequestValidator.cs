using BusOperator.Application.DTOs.Trips;
using BusOperator.Domain.Enums;
using FluentValidation;

namespace BusOperator.Application.Validators.Trips;

public class TripStatusUpdateRequestValidator : AbstractValidator<TripStatusUpdateRequest>
{
    public TripStatusUpdateRequestValidator()
    {
        RuleFor(x => x.Status).Must(x => TripStatuses.All.Contains(x)).WithMessage("Invalid trip status.");
    }
}
