namespace BusOperator.Domain.Enums;

public static class TripStatuses
{
    public const string Draft = "DRAFT";
    public const string Scheduled = "SCHEDULED";
    public const string InProgress = "IN_PROGRESS";
    public const string Completed = "COMPLETED";
    public const string Cancelled = "CANCELLED";

    public static readonly string[] All = [Draft, Scheduled, InProgress, Completed, Cancelled];
}
