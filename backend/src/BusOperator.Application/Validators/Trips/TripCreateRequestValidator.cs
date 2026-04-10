using BusOperator.Application.DTOs.Trips;
using BusOperator.Domain.Enums;
using FluentValidation;

namespace BusOperator.Application.Validators.Trips;

public class TripCreateRequestValidator : AbstractValidator<TripCreateRequest>
{
    public TripCreateRequestValidator()
    {
        RuleFor(x => x.BranchId).GreaterThan(0);
        RuleFor(x => x.TripCode).NotEmpty();
        RuleFor(x => x.RouteId).GreaterThan(0);
        RuleFor(x => x.VehicleId).GreaterThan(0);
        RuleFor(x => x.DriverId).GreaterThan(0);
        RuleFor(x => x.DepartureDate).Must(x => x >= DateOnly.FromDateTime(DateTime.UtcNow.Date.AddYears(-1)));
        RuleFor(x => x.Status).Must(x => TripStatuses.All.Contains(x)).WithMessage("Invalid trip status.");
    }
}
