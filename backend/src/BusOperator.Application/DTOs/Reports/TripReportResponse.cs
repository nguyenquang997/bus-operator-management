namespace BusOperator.Application.DTOs.Reports;

public class TripReportResponse
{
    public int TripId { get; set; }
    public string TripCode { get; set; } = string.Empty;
    public string RouteName { get; set; } = string.Empty;
    public string VehiclePlateNumber { get; set; } = string.Empty;
    public string DriverName { get; set; } = string.Empty;
    public DateOnly DepartureDate { get; set; }
    public string Status { get; set; } = string.Empty;
    public decimal TotalRevenue { get; set; }
    public decimal TotalExpense { get; set; }
    public decimal Profit { get; set; }
}
