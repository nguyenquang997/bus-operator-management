using BusOperator.Application.DTOs.Employees;
using BusOperator.Domain.Enums;
using FluentValidation;

namespace BusOperator.Application.Validators.Employees;

public class EmployeeCreateRequestValidator : AbstractValidator<EmployeeCreateRequest>
{
    public EmployeeCreateRequestValidator()
    {
        RuleFor(x => x.BranchId).GreaterThan(0);
        RuleFor(x => x.Code).NotEmpty();
        RuleFor(x => x.FullName).NotEmpty();
        RuleFor(x => x.EmployeeType).Must(x => EmployeeTypes.All.Contains(x)).WithMessage("Invalid employee type.");
    }
}
