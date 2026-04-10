using BusOperator.Application.DTOs.Expenses;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusOperator.Api.Controllers;

[ApiController]
[Route("api/trips/{tripId:int}/expense")]
[Authorize]
public class ExpensesController(ITripExpenseService tripExpenseService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<TripExpenseResponse?>> GetByTrip(int tripId, CancellationToken cancellationToken)
        => Ok(await tripExpenseService.GetByTripIdAsync(tripId, cancellationToken));

    [HttpPost]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Accountant)]
    public async Task<ActionResult<TripExpenseResponse>> Create(int tripId, [FromBody] TripExpenseCreateRequest request, CancellationToken cancellationToken)
        => Ok(await tripExpenseService.CreateAsync(tripId, request, cancellationToken));

    [HttpPut]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Accountant)]
    public async Task<ActionResult<TripExpenseResponse>> Update(int tripId, [FromBody] TripExpenseUpdateRequest request, CancellationToken cancellationToken)
        => Ok(await tripExpenseService.UpdateAsync(tripId, request, cancellationToken));
}
