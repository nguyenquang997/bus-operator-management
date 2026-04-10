using BusOperator.Application.DTOs.Vehicles;
using FluentValidation;

namespace BusOperator.Application.Validators.Vehicles;

public class VehicleUpdateRequestValidator : AbstractValidator<VehicleUpdateRequest>
{
    public VehicleUpdateRequestValidator()
    {
        Include(new VehicleCreateRequestValidator());
    }
}
