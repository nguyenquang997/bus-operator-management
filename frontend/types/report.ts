export interface TripReportRow {
  tripId: number;
  tripCode: string;
  routeName: string;
  vehiclePlateNumber: string;
  driverName: string;
  assistantName?: string | null;
  departureDate: string;
  status: string;
  totalRevenue: number;
  totalExpense: number;
  profit: number;
}
