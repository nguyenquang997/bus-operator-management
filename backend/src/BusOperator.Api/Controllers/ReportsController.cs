using BusOperator.Application.DTOs.Reports;
using BusOperator.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BusOperator.Api.Controllers;

[ApiController]
[Route("api/reports")]
[Authorize]
public class ReportsController(IReportService reportService) : ControllerBase
{
    [HttpGet("trips")]
    public async Task<ActionResult<IReadOnlyCollection<TripReportResponse>>> GetTripReports(CancellationToken cancellationToken)
        => Ok(await reportService.GetTripReportsAsync(cancellationToken));
}
