using BusOperator.Application.DTOs.Vehicles;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusOperator.Api.Controllers;

[ApiController]
[Route("api/vehicles")]
[Authorize]
public class VehiclesController(IVehicleService vehicleService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<VehicleResponse>>> GetAll(CancellationToken cancellationToken)
        => Ok(await vehicleService.GetAllAsync(cancellationToken));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<VehicleResponse>> GetById(int id, CancellationToken cancellationToken)
        => Ok(await vehicleService.GetByIdAsync(id, cancellationToken));

    [HttpPost]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Operator)]
    public async Task<ActionResult<VehicleResponse>> Create([FromBody] VehicleCreateRequest request, CancellationToken cancellationToken)
    {
        var result = await vehicleService.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Operator)]
    public async Task<ActionResult<VehicleResponse>> Update(int id, [FromBody] VehicleUpdateRequest request, CancellationToken cancellationToken)
        => Ok(await vehicleService.UpdateAsync(id, request, cancellationToken));

    [HttpDelete("{id:int}")]
    [Authorize(Roles = AppRoles.Admin)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        await vehicleService.DeleteAsync(id, cancellationToken);
        return NoContent();
    }
}
