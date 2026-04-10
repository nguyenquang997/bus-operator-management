import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/queries/query-keys";
import { revenueService } from "@/services/revenue.service";
import { ApiError } from "@/services/api-client";
import type { TripRevenuePayload } from "@/types/revenue";

export function useRevenueQuery(tripId: string) {
  return useQuery({
    queryKey: queryKeys.revenue(tripId),
    queryFn: async () => {
      try {
        return await revenueService.getRevenue(tripId);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!tripId,
    retry: false
  });
}

export function useCreateRevenueMutation(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: TripRevenuePayload) => revenueService.createRevenue(tripId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.revenue(tripId) })
  });
}

export function useUpdateRevenueMutation(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: TripRevenuePayload) => revenueService.updateRevenue(tripId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.revenue(tripId) })
  });
}
