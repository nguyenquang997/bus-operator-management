namespace BusOperator.Application.DTOs.Revenues;

public class TripRevenueUpdateRequest : TripRevenueCreateRequest
{
    public bool IsFinalized { get; set; }
}
