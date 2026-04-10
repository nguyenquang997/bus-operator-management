using BusOperator.Domain.Common;

namespace BusOperator.Domain.Entities;

public class TripRevenueDetail : AuditableEntity
{
    public int Id { get; set; }
    public int TripRevenueId { get; set; }
    public int RevenueTypeId { get; set; }
    public decimal Amount { get; set; }
    public string? Description { get; set; }

    public TripRevenue TripRevenue { get; set; } = null!;
    public RevenueType RevenueType { get; set; } = null!;
}
