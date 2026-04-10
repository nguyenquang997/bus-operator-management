using BusOperator.Application.DTOs.Routes;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusOperator.Api.Controllers;

[ApiController]
[Route("api/routes")]
[Authorize]
public class RoutesController(IRouteService routeService) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IReadOnlyCollection<RouteResponse>>> GetAll(CancellationToken cancellationToken)
        => Ok(await routeService.GetAllAsync(cancellationToken));

    [HttpGet("{id:int}")]
    public async Task<ActionResult<RouteResponse>> GetById(int id, CancellationToken cancellationToken)
        => Ok(await routeService.GetByIdAsync(id, cancellationToken));

    [HttpPost]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Operator)]
    public async Task<ActionResult<RouteResponse>> Create([FromBody] RouteCreateRequest request, CancellationToken cancellationToken)
    {
        var result = await routeService.CreateAsync(request, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpPut("{id:int}")]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Operator)]
    public async Task<ActionResult<RouteResponse>> Update(int id, [FromBody] RouteUpdateRequest request, CancellationToken cancellationToken)
        => Ok(await routeService.UpdateAsync(id, request, cancellationToken));

    [HttpDelete("{id:int}")]
    [Authorize(Roles = AppRoles.Admin)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        await routeService.DeleteAsync(id, cancellationToken);
        return NoContent();
    }

    [HttpGet("{routeId:int}/stops")]
    public async Task<ActionResult<IReadOnlyCollection<RouteStopResponse>>> GetStops(int routeId, CancellationToken cancellationToken)
        => Ok(await routeService.GetStopsAsync(routeId, cancellationToken));

    [HttpPost("{routeId:int}/stops")]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Operator)]
    public async Task<ActionResult<RouteStopResponse>> CreateStop(int routeId, [FromBody] RouteStopCreateRequest request, CancellationToken cancellationToken)
        => Ok(await routeService.CreateStopAsync(routeId, request, cancellationToken));
}
