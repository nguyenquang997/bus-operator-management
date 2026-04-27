namespace BusOperator.Application.DTOs.Users;

public class UserResponse
{
    public int Id { get; set; }
    public int BranchId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? PhoneNumber { get; set; }
    public bool IsActive { get; set; }
    public string[] Roles { get; set; } = [];
}
