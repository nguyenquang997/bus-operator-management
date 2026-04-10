namespace BusOperator.Application.DTOs.Revenues;

public class TripRevenueDetailResponse
{
    public int Id { get; set; }
    public int RevenueTypeId { get; set; }
    public string RevenueTypeCode { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public string? Description { get; set; }
}
