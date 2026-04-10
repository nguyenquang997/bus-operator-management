using BusOperator.Application.DTOs.Auth;
using BusOperator.Domain.Entities;

namespace BusOperator.Infrastructure.Authentication;

public interface IJwtTokenGenerator
{
    (string Token, DateTime ExpiresAt) Generate(User user, IReadOnlyCollection<string> roles);
}
