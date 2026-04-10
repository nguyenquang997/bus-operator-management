namespace BusOperator.Application.Interfaces;

public interface ICurrentUserContext
{
    int? UserId { get; }
    string? Username { get; }
    string? FullName { get; }
    IReadOnlyCollection<string> Roles { get; }
    bool IsAuthenticated { get; }
}
