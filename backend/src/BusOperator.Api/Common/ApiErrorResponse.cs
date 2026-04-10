namespace BusOperator.Api.Common;

public class ApiErrorResponse
{
    public int StatusCode { get; set; }
    public string Message { get; set; } = string.Empty;
    public IReadOnlyCollection<string>? Errors { get; set; }
    public string TraceId { get; set; } = string.Empty;
}
