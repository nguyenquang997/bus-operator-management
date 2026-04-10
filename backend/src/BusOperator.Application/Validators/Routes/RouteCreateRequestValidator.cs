using BusOperator.Application.DTOs.Routes;
using FluentValidation;

namespace BusOperator.Application.Validators.Routes;

public class RouteCreateRequestValidator : AbstractValidator<RouteCreateRequest>
{
    public RouteCreateRequestValidator()
    {
        RuleFor(x => x.Code).NotEmpty();
        RuleFor(x => x.Name).NotEmpty();
        RuleFor(x => x.FromLocation).NotEmpty();
        RuleFor(x => x.ToLocation).NotEmpty();
        RuleFor(x => x.BaseTicketPrice).GreaterThanOrEqualTo(0);
        RuleFor(x => x.DistanceKm).GreaterThanOrEqualTo(0);
        RuleFor(x => x.EstimatedDurationMinutes).GreaterThan(0);
    }
}
