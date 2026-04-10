namespace BusOperator.Application.DTOs.Routes;

public class RouteStopResponse
{
    public int Id { get; set; }
    public int RouteId { get; set; }
    public int StopOrder { get; set; }
    public string StopName { get; set; } = string.Empty;
    public string? Address { get; set; }
    public string StopType { get; set; } = string.Empty;
    public int? EstimatedOffsetMinutes { get; set; }
    public bool IsActive { get; set; }
}
