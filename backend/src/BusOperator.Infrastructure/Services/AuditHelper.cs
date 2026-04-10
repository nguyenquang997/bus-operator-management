using BusOperator.Application.Interfaces;

namespace BusOperator.Infrastructure.Services;

internal static class AuditHelper
{
    public static string Actor(ICurrentUserContext currentUserContext)
        => currentUserContext.Username ?? "SYSTEM";
}
