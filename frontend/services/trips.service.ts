import { apiClient } from "@/services/api-client";
import type { Trip, TripPayload, TripStatus } from "@/types/trip";

interface TripApi {
  Id: number;
  BranchId: number;
  TripCode: string;
  RouteId: number;
  RouteName: string;
  VehicleId: number;
  VehiclePlateNumber: string;
  DriverId: number;
  DriverName: string;
  AssistantId?: number;
  AssistantName?: string;
  DepartureDate: string;
  DepartureTime: string;
  EstimatedArrivalTime?: string;
  Status: TripStatus;
  Notes?: string;
  BookingOpenTime?: string;
  BookingCloseTime?: string;
  AllowOnlineBooking: boolean;
}

const mapTrip = (x: TripApi): Trip => ({
  id: x.Id,
  branchId: x.BranchId,
  tripCode: x.TripCode,
  routeId: x.RouteId,
  routeName: x.RouteName,
  vehicleId: x.VehicleId,
  vehiclePlateNumber: x.VehiclePlateNumber,
  driverId: x.DriverId,
  driverName: x.DriverName,
  assistantId: x.AssistantId,
  assistantName: x.AssistantName,
  departureDate: x.DepartureDate,
  departureTime: x.DepartureTime,
  departureAtDisplay: `${x.DepartureDate}T${x.DepartureTime}`,
  estimatedArrivalTime: x.EstimatedArrivalTime,
  status: x.Status,
  notes: x.Notes,
  bookingOpenTime: x.BookingOpenTime,
  bookingCloseTime: x.BookingCloseTime,
  allowOnlineBooking: x.AllowOnlineBooking
});

const toBody = (payload: TripPayload) => ({
  BranchId: payload.branchId,
  TripCode: payload.tripCode,
  RouteId: payload.routeId,
  VehicleId: payload.vehicleId,
  DriverId: payload.driverId,
  AssistantId: payload.assistantId ?? null,
  DepartureDate: payload.departureDate,
  DepartureTime: payload.departureTime,
  EstimatedArrivalTime: payload.estimatedArrivalTime || null,
  BookingOpenTime: payload.bookingOpenTime || null,
  BookingCloseTime: payload.bookingCloseTime || null,
  AllowOnlineBooking: payload.allowOnlineBooking,
  Status: payload.status,
  Notes: payload.notes || null
});

export const tripsService = {
  getTrips: async () => (await apiClient.get<TripApi[]>("/api/trips")).map(mapTrip),
  getTrip: async (id: string) => mapTrip(await apiClient.get<TripApi>(`/api/trips/${id}`)),
  createTrip: async (payload: TripPayload) =>
    mapTrip(await apiClient.post<TripApi, ReturnType<typeof toBody>>("/api/trips", toBody(payload))),
  updateTrip: async (id: string, payload: TripPayload) =>
    mapTrip(await apiClient.put<TripApi, ReturnType<typeof toBody>>(`/api/trips/${id}`, toBody(payload))),
  updateTripStatus: async (id: string, status: TripStatus) =>
    mapTrip(await apiClient.patch<TripApi, { Status: TripStatus; Note?: string | null }>(`/api/trips/${id}/status`, { Status: status, Note: null }))
};
