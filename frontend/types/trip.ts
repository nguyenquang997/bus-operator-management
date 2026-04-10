export type TripStatus = "DRAFT" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface Trip {
  id: number;
  branchId: number;
  tripCode: string;
  routeId: number;
  routeName: string;
  vehicleId: number;
  vehiclePlateNumber: string;
  driverId: number;
  driverName: string;
  assistantId?: number | null;
  assistantName?: string | null;
  departureDate: string;
  departureTime: string;
  departureAtDisplay: string;
  estimatedArrivalTime?: string | null;
  status: TripStatus;
  notes?: string | null;
  bookingOpenTime?: string | null;
  bookingCloseTime?: string | null;
  allowOnlineBooking: boolean;
}

export interface TripPayload {
  branchId: number;
  tripCode: string;
  routeId: number;
  vehicleId: number;
  driverId: number;
  assistantId?: number | null;
  departureDate: string;
  departureTime: string;
  estimatedArrivalTime?: string | null;
  bookingOpenTime?: string | null;
  bookingCloseTime?: string | null;
  allowOnlineBooking: boolean;
  status: TripStatus;
  notes?: string;
}
