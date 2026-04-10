import { apiClient } from "@/services/api-client";
import type { TripReportRow } from "@/types/report";

interface ReportApi {
  TripId: number;
  TripCode: string;
  RouteName: string;
  VehiclePlateNumber: string;
  DriverName: string;
  DepartureDate: string;
  Status: string;
  TotalRevenue: number;
  TotalExpense: number;
  Profit: number;
}

export const reportsService = {
  getTripReport: async (): Promise<TripReportRow[]> => {
    const rows = await apiClient.get<ReportApi[]>("/api/reports/trips");
    return rows.map((row) => ({
      tripId: row.TripId,
      tripCode: row.TripCode,
      routeName: row.RouteName,
      vehiclePlateNumber: row.VehiclePlateNumber,
      driverName: row.DriverName,
      departureDate: row.DepartureDate,
      status: row.Status,
      totalRevenue: Number(row.TotalRevenue),
      totalExpense: Number(row.TotalExpense),
      profit: Number(row.Profit)
    }));
  }
};
