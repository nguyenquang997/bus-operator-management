namespace BusOperator.Application.DTOs.Revenues;

public class TripRevenueDetailRequest
{
    public int RevenueTypeId { get; set; }
    public decimal Amount { get; set; }
    public string? Description { get; set; }
}
