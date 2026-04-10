using BusOperator.Domain.Common;

namespace BusOperator.Domain.Entities;

public class Trip : AuditableEntity
{
    public int Id { get; set; }
    public int BranchId { get; set; }
    public string TripCode { get; set; } = string.Empty;
    public int RouteId { get; set; }
    public int VehicleId { get; set; }
    public int DriverId { get; set; }
    public int? AssistantId { get; set; }
    public DateOnly DepartureDate { get; set; }
    public TimeOnly DepartureTime { get; set; }
    public TimeOnly? EstimatedArrivalTime { get; set; }
    public DateTime? ActualDepartureAt { get; set; }
    public DateTime? ActualArrivalAt { get; set; }
    public int SeatCountSnapshot { get; set; }
    public decimal BaseTicketPriceSnapshot { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public DateTime? BookingOpenTime { get; set; }
    public DateTime? BookingCloseTime { get; set; }
    public bool AllowOnlineBooking { get; set; }

    public Branch Branch { get; set; } = null!;
    public Route Route { get; set; } = null!;
    public Vehicle Vehicle { get; set; } = null!;
    public Employee Driver { get; set; } = null!;
    public Employee? Assistant { get; set; }
    public ICollection<TripStatusHistory> StatusHistories { get; set; } = new List<TripStatusHistory>();
    public TripRevenue? TripRevenue { get; set; }
    public TripExpense? TripExpense { get; set; }
}
