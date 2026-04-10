using BusOperator.Application.DTOs.Revenues;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusOperator.Api.Controllers;

[ApiController]
[Route("api/trips/{tripId:int}/revenue")]
[Authorize]
public class RevenuesController(ITripRevenueService tripRevenueService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<TripRevenueResponse?>> GetByTrip(int tripId, CancellationToken cancellationToken)
        => Ok(await tripRevenueService.GetByTripIdAsync(tripId, cancellationToken));

    [HttpPost]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Accountant)]
    public async Task<ActionResult<TripRevenueResponse>> Create(int tripId, [FromBody] TripRevenueCreateRequest request, CancellationToken cancellationToken)
        => Ok(await tripRevenueService.CreateAsync(tripId, request, cancellationToken));

    [HttpPut]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Accountant)]
    public async Task<ActionResult<TripRevenueResponse>> Update(int tripId, [FromBody] TripRevenueUpdateRequest request, CancellationToken cancellationToken)
        => Ok(await tripRevenueService.UpdateAsync(tripId, request, cancellationToken));
}
