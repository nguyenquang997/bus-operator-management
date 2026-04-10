namespace BusOperator.Application.DTOs.Routes;

public class RouteStopCreateRequest
{
    public int StopOrder { get; set; }
    public string StopName { get; set; } = string.Empty;
    public string? Address { get; set; }
    public string StopType { get; set; } = "PICKUP";
    public int? EstimatedOffsetMinutes { get; set; }
    public bool IsActive { get; set; } = true;
}
