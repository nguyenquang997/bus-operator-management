import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/queries/query-keys";
import { reportsService } from "@/services/reports.service";

export function useTripReportQuery() {
  return useQuery({ queryKey: queryKeys.tripReport, queryFn: reportsService.getTripReport });
}
