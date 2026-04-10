using BusOperator.Application.DTOs.Routes;
using FluentValidation;

namespace BusOperator.Application.Validators.Routes;

public class RouteStopCreateRequestValidator : AbstractValidator<RouteStopCreateRequest>
{
    public RouteStopCreateRequestValidator()
    {
        RuleFor(x => x.StopOrder).GreaterThan(0);
        RuleFor(x => x.StopName).NotEmpty();
        RuleFor(x => x.StopType).NotEmpty();
    }
}
