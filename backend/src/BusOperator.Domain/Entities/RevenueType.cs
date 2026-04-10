namespace BusOperator.Domain.Entities;

public class RevenueType
{
    public int Id { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public bool IsSystem { get; set; } = true;
    public bool IsActive { get; set; } = true;

    public ICollection<TripRevenueDetail> TripRevenueDetails { get; set; } = new List<TripRevenueDetail>();
}
