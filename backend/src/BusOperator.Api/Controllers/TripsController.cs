using BusOperator.Application.DTOs.Trips;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusOperator.Api.Controllers;

[ApiController]
[Route("api/trips")]
[Authorize]
public class TripsController(ITripService tripService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<TripResponse>>> GetAll(CancellationToken cancellationToken)
        => Ok(await tripService.GetAllAsync(cancellationToken));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TripResponse>> GetById(int id, CancellationToken cancellationToken)
        => Ok(await tripService.GetByIdAsync(id, cancellationToken));

    [HttpPost]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Operator)]
    public async Task<ActionResult<TripResponse>> Create([FromBody] TripCreateRequest request, CancellationToken cancellationToken)
    {
        var result = await tripService.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Operator)]
    public async Task<ActionResult<TripResponse>> Update(int id, [FromBody] TripUpdateRequest request, CancellationToken cancellationToken)
        => Ok(await tripService.UpdateAsync(id, request, cancellationToken));

    [HttpPatch("{id:int}/status")]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Operator)]
    public async Task<ActionResult<TripResponse>> UpdateStatus(int id, [FromBody] TripStatusUpdateRequest request, CancellationToken cancellationToken)
        => Ok(await tripService.UpdateStatusAsync(id, request, cancellationToken));
}
