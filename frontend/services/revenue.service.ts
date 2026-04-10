import { apiClient } from "@/services/api-client";
import type { TripRevenue, TripRevenuePayload } from "@/types/revenue";

interface RevenueApi {
  Id: number;
  TripId: number;
  RevenueSourceType: string;
  PassengerCountActual?: number;
  TotalAmount: number;
  Notes?: string;
  Details: {
    Id: number;
    RevenueTypeId: number;
    RevenueTypeCode: string;
    Amount: number;
    Description?: string;
  }[];
}

const mapRevenue = (x: RevenueApi): TripRevenue => ({
  id: x.Id,
  tripId: x.TripId,
  revenueSourceType: x.RevenueSourceType,
  passengerCountActual: x.PassengerCountActual,
  totalAmount: Number(x.TotalAmount),
  notes: x.Notes,
  details: (x.Details || []).map((d) => ({
    id: d.Id,
    revenueTypeId: d.RevenueTypeId,
    revenueTypeCode: d.RevenueTypeCode,
    amount: Number(d.Amount),
    description: d.Description
  }))
});

export const revenueService = {
  getRevenue: async (tripId: string) => mapRevenue(await apiClient.get<RevenueApi>(`/api/trips/${tripId}/revenue`)),
  createRevenue: async (tripId: string, payload: TripRevenuePayload) =>
    mapRevenue(await apiClient.post<RevenueApi, TripRevenuePayload>(`/api/trips/${tripId}/revenue`, payload)),
  updateRevenue: async (tripId: string, payload: TripRevenuePayload) =>
    mapRevenue(await apiClient.put<RevenueApi, TripRevenuePayload>(`/api/trips/${tripId}/revenue`, payload))
};
