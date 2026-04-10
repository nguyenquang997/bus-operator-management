namespace BusOperator.Application.DTOs.Revenues;

public class TripRevenueCreateRequest
{
    public string RevenueSourceType { get; set; } = "MANUAL";
    public int? PassengerCountActual { get; set; }
    public string? Notes { get; set; }
    public IReadOnlyCollection<TripRevenueDetailRequest> Details { get; set; } = [];
}
