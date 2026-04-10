import { apiClient } from "@/services/api-client";
import type { Vehicle, VehiclePayload } from "@/types/vehicle";

interface VehicleApi {
  Id: number;
  BranchId: number;
  Code: string;
  PlateNumber: string;
  VehicleType: string;
  Brand?: string;
  Model?: string;
  SeatCount: number;
  YearOfManufacture?: number;
  Status: string;
  IsActive: boolean;
}

const mapVehicle = (x: VehicleApi): Vehicle => ({
  id: x.Id,
  branchId: x.BranchId,
  code: x.Code,
  plateNumber: x.PlateNumber,
  vehicleType: x.VehicleType,
  brand: x.Brand,
  model: x.Model,
  seatCount: x.SeatCount,
  yearOfManufacture: x.YearOfManufacture,
  status: x.Status,
  isActive: x.IsActive
});

const toBody = (payload: VehiclePayload) => ({
  BranchId: payload.branchId,
  Code: payload.code,
  PlateNumber: payload.plateNumber,
  VehicleType: payload.vehicleType,
  Brand: payload.brand || null,
  Model: payload.model || null,
  SeatCount: payload.seatCount,
  YearOfManufacture: payload.yearOfManufacture ?? null,
  Status: payload.status,
  IsActive: payload.isActive
});

export const vehiclesService = {
  getVehicles: async () => (await apiClient.get<VehicleApi[]>("/api/vehicles")).map(mapVehicle),
  getVehicle: async (id: string) => mapVehicle(await apiClient.get<VehicleApi>(`/api/vehicles/${id}`)),
  createVehicle: async (payload: VehiclePayload) =>
    mapVehicle(await apiClient.post<VehicleApi, ReturnType<typeof toBody>>("/api/vehicles", toBody(payload))),
  updateVehicle: async (id: string, payload: VehiclePayload) =>
    mapVehicle(await apiClient.put<VehicleApi, ReturnType<typeof toBody>>(`/api/vehicles/${id}`, toBody(payload))),
  deleteVehicle: (id: string) => apiClient.delete<void>(`/api/vehicles/${id}`)
};
