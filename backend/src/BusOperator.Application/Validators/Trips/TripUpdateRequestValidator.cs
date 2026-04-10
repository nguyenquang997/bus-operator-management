using BusOperator.Application.DTOs.Trips;
using FluentValidation;

namespace BusOperator.Application.Validators.Trips;

public class TripUpdateRequestValidator : AbstractValidator<TripUpdateRequest>
{
    public TripUpdateRequestValidator()
    {
        RuleFor(x => x.RouteId).GreaterThan(0);
        RuleFor(x => x.VehicleId).GreaterThan(0);
        RuleFor(x => x.DriverId).GreaterThan(0);
        RuleFor(x => x.DepartureDate).Must(x => x >= DateOnly.FromDateTime(DateTime.UtcNow.Date.AddYears(-1)));
    }
}
