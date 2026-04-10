namespace BusOperator.Application.DTOs.Dashboard;

public class DashboardSummaryResponse
{
    public int TotalTrips { get; set; }
    public decimal TotalRevenue { get; set; }
    public decimal TotalExpense { get; set; }
    public decimal Profit { get; set; }
}
