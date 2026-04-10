using BusOperator.Domain.Common;

namespace BusOperator.Domain.Entities;

public class TripRevenue : AuditableEntity
{
    public int Id { get; set; }
    public int TripId { get; set; }
    public string RevenueSourceType { get; set; } = string.Empty;
    public int? PassengerCountActual { get; set; }
    public decimal TotalAmount { get; set; }
    public bool IsFinalized { get; set; }
    public DateTime? FinalizedAt { get; set; }
    public string? FinalizedBy { get; set; }
    public string? Notes { get; set; }

    public Trip Trip { get; set; } = null!;
    public ICollection<TripRevenueDetail> Details { get; set; } = new List<TripRevenueDetail>();
}
