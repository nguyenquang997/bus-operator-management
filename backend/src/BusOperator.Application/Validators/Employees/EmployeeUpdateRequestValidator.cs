using BusOperator.Application.DTOs.Employees;
using FluentValidation;

namespace BusOperator.Application.Validators.Employees;

public class EmployeeUpdateRequestValidator : AbstractValidator<EmployeeUpdateRequest>
{
    public EmployeeUpdateRequestValidator()
    {
        Include(new EmployeeCreateRequestValidator());
    }
}
