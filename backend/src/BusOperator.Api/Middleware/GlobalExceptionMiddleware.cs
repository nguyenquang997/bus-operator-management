using System.Net;
using System.Text.Json;
using BusOperator.Api.Common;
using BusOperator.Application.Common;
using FluentValidation;

namespace BusOperator.Api.Middleware;

public class GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
{
    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            logger.LogWarning(ex, "Validation failure");
            await WriteError(context, HttpStatusCode.BadRequest, "Validation error.", ex.Errors.Select(x => x.ErrorMessage).ToArray());
        }
        catch (AppException ex)
        {
            logger.LogWarning(ex, "Application error");
            await WriteError(context, ex.StatusCode, ex.Message);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception");
            await WriteError(context, HttpStatusCode.InternalServerError, "Internal server error.");
        }
    }

    private static async Task WriteError(HttpContext context, HttpStatusCode statusCode, string message, IReadOnlyCollection<string>? errors = null)
    {
        context.Response.StatusCode = (int)statusCode;
        context.Response.ContentType = "application/json";

        var payload = new ApiErrorResponse
        {
            StatusCode = (int)statusCode,
            Message = message,
            Errors = errors,
            TraceId = context.TraceIdentifier
        };

        await context.Response.WriteAsync(JsonSerializer.Serialize(payload));
    }
}
