namespace BusOperator.Application.DTOs.Routes;

public class RouteCreateRequest
{
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string FromLocation { get; set; } = string.Empty;
    public string ToLocation { get; set; } = string.Empty;
    public decimal DistanceKm { get; set; }
    public int EstimatedDurationMinutes { get; set; }
    public decimal BaseTicketPrice { get; set; }
    public bool IsActive { get; set; } = true;
}
