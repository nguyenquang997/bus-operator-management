namespace BusOperator.Domain.Entities;

public class RouteStop
{
    public int Id { get; set; }
    public int RouteId { get; set; }
    public int StopOrder { get; set; }
    public string StopName { get; set; } = string.Empty;
    public string? Address { get; set; }
    public string StopType { get; set; } = "PICKUP";
    public int? EstimatedOffsetMinutes { get; set; }
    public bool IsActive { get; set; } = true;

    public Route Route { get; set; } = null!;
}
