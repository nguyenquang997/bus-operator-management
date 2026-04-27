namespace BusOperator.Application.DTOs.Users;

public class UserCreateRequest
{
    public int BranchId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public bool IsActive { get; set; } = true;
    public string[] RoleCodes { get; set; } = [];
}
