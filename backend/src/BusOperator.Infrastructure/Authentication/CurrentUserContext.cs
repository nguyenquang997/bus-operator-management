using System.Security.Claims;
using BusOperator.Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace BusOperator.Infrastructure.Authentication;

public class CurrentUserContext(IHttpContextAccessor httpContextAccessor) : ICurrentUserContext
{
    private ClaimsPrincipal? User => httpContextAccessor.HttpContext?.User;

    public int? UserId
    {
        get
        {
            var value = User?.FindFirstValue("userId") ?? User?.FindFirstValue(ClaimTypes.NameIdentifier);
            return int.TryParse(value, out var parsed) ? parsed : null;
        }
    }

    public string? Username => User?.FindFirstValue("username") ?? User?.Identity?.Name;

    public string? FullName => User?.FindFirstValue("fullName");

    public IReadOnlyCollection<string> Roles =>
        User?.FindAll(ClaimTypes.Role).Select(x => x.Value).Distinct().ToArray() ?? [];

    public bool IsAuthenticated => User?.Identity?.IsAuthenticated ?? false;
}
