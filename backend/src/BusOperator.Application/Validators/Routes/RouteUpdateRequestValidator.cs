using BusOperator.Application.DTOs.Routes;
using FluentValidation;

namespace BusOperator.Application.Validators.Routes;

public class RouteUpdateRequestValidator : AbstractValidator<RouteUpdateRequest>
{
    public RouteUpdateRequestValidator()
    {
        Include(new RouteCreateRequestValidator());
    }
}
