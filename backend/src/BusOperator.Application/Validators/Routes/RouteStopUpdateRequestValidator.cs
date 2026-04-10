using BusOperator.Application.DTOs.Routes;
using FluentValidation;

namespace BusOperator.Application.Validators.Routes;

public class RouteStopUpdateRequestValidator : AbstractValidator<RouteStopUpdateRequest>
{
    public RouteStopUpdateRequestValidator()
    {
        Include(new RouteStopCreateRequestValidator());
    }
}
