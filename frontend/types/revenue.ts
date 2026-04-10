export interface TripRevenueDetail {
  id: number;
  revenueTypeId: number;
  revenueTypeCode: string;
  amount: number;
  description?: string | null;
}

export interface TripRevenue {
  id: number;
  tripId: number;
  revenueSourceType: string;
  passengerCountActual?: number | null;
  totalAmount: number;
  notes?: string | null;
  details: TripRevenueDetail[];
}

export interface TripRevenuePayload {
  RevenueSourceType: string;
  PassengerCountActual?: number | null;
  Notes?: string;
  Details: {
    RevenueTypeId: number;
    Amount: number;
    Description?: string;
  }[];
}
