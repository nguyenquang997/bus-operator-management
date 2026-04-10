import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/queries/query-keys";
import { vehiclesService } from "@/services/vehicles.service";
import type { VehiclePayload } from "@/types/vehicle";

export function useVehiclesQuery() {
  return useQuery({ queryKey: queryKeys.vehicles, queryFn: vehiclesService.getVehicles });
}

export function useVehicleQuery(id: string) {
  return useQuery({ queryKey: queryKeys.vehicle(id), queryFn: () => vehiclesService.getVehicle(id), enabled: !!id });
}

export function useCreateVehicleMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: VehiclePayload) => vehiclesService.createVehicle(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.vehicles })
  });
}

export function useUpdateVehicleMutation(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: VehiclePayload) => vehiclesService.updateVehicle(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.vehicles });
      qc.invalidateQueries({ queryKey: queryKeys.vehicle(id) });
    }
  });
}

export function useDeleteVehicleMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => vehiclesService.deleteVehicle(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.vehicles })
  });
}
