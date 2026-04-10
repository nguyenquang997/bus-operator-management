import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/queries/query-keys";
import { tripsService } from "@/services/trips.service";
import type { TripPayload, TripStatus } from "@/types/trip";

export function useTripsQuery() {
  return useQuery({ queryKey: queryKeys.trips, queryFn: tripsService.getTrips });
}

export function useTripQuery(id: string) {
  return useQuery({ queryKey: queryKeys.trip(id), queryFn: () => tripsService.getTrip(id), enabled: !!id });
}

export function useCreateTripMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: TripPayload) => tripsService.createTrip(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.trips })
  });
}

export function useUpdateTripMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: TripPayload) => tripsService.updateTrip(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.trips });
      qc.invalidateQueries({ queryKey: queryKeys.trip(id) });
    }
  });
}

export function useUpdateTripStatusMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (status: TripStatus) => tripsService.updateTripStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.trips });
      qc.invalidateQueries({ queryKey: queryKeys.trip(id) });
    }
  });
}
