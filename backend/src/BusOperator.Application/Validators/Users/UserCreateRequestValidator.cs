using BusOperator.Application.DTOs.Users;
using BusOperator.Domain.Enums;
using FluentValidation;

namespace BusOperator.Application.Validators.Users;

public class UserCreateRequestValidator : AbstractValidator<UserCreateRequest>
{
    public UserCreateRequestValidator()
    {
        RuleFor(x => x.BranchId).GreaterThan(0);
        RuleFor(x => x.Username).NotEmpty().MaximumLength(100);
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
        RuleFor(x => x.FullName).NotEmpty().MaximumLength(255);
        RuleFor(x => x.Email).MaximumLength(255).EmailAddress().When(x => !string.IsNullOrWhiteSpace(x.Email));
        RuleFor(x => x.PhoneNumber).MaximumLength(20).When(x => !string.IsNullOrWhiteSpace(x.PhoneNumber));
        RuleFor(x => x.RoleCodes).NotEmpty();
        RuleForEach(x => x.RoleCodes)
            .Must(role => !string.IsNullOrWhiteSpace(role) && AppRoles.All.Contains(role.ToUpperInvariant()))
            .WithMessage("Invalid role code.");
    }
}
