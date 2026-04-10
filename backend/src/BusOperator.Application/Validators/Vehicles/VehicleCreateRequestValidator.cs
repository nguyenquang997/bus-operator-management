using BusOperator.Application.DTOs.Vehicles;
using BusOperator.Domain.Enums;
using FluentValidation;

namespace BusOperator.Application.Validators.Vehicles;

public class VehicleCreateRequestValidator : AbstractValidator<VehicleCreateRequest>
{
    public VehicleCreateRequestValidator()
    {
        RuleFor(x => x.BranchId).GreaterThan(0);
        RuleFor(x => x.Code).NotEmpty();
        RuleFor(x => x.PlateNumber).NotEmpty();
        RuleFor(x => x.VehicleType).NotEmpty();
        RuleFor(x => x.SeatCount).GreaterThan(0);
        RuleFor(x => x.Status).Must(x => VehicleStatuses.All.Contains(x)).WithMessage("Invalid vehicle status.");
    }
}
