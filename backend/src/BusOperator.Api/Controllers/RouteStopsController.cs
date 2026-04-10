using BusOperator.Application.DTOs.Routes;
using BusOperator.Application.Interfaces;
using BusOperator.Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusOperator.Api.Controllers;

[ApiController]
[Route("api/route-stops")]
[Authorize]
public class RouteStopsController(IRouteService routeService) : ControllerBase
{
    [HttpPut("{id:int}")]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Operator)]
    public async Task<ActionResult<RouteStopResponse>> Update(int id, [FromBody] RouteStopUpdateRequest request, CancellationToken cancellationToken)
        => Ok(await routeService.UpdateStopAsync(id, request, cancellationToken));

    [HttpDelete("{id:int}")]
    [Authorize(Roles = AppRoles.Admin + "," + AppRoles.Operator)]
    public async Task<IActionResult> Delete(int id, CancellationToken cancellationToken)
    {
        await routeService.DeleteStopAsync(id, cancellationToken);
        return NoContent();
    }
}
