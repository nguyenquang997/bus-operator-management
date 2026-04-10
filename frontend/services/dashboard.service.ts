import { apiClient } from "@/services/api-client";
import type { DashboardSummary } from "@/types/dashboard";

interface DashboardApi {
  TotalTrips: number;
  TotalRevenue: number;
  TotalExpense: number;
  Profit: number;
}

export const dashboardService = {
  getSummary: async (): Promise<DashboardSummary> => {
    const data = await apiClient.get<DashboardApi>("/api/dashboard/summary");
    return {
      totalTrips: data.TotalTrips,
      totalRevenue: Number(data.TotalRevenue),
      totalExpense: Number(data.TotalExpense),
      profit: Number(data.Profit)
    };
  }
};
