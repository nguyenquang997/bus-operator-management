import { apiClient } from "@/services/api-client";
import type { TripExpense, TripExpensePayload } from "@/types/expense";

interface ExpenseApi {
  Id: number;
  TripId: number;
  TotalAmount: number;
  Notes?: string;
  Details: {
    Id: number;
    ExpenseTypeId: number;
    ExpenseTypeCode: string;
    Amount: number;
    Description?: string;
  }[];
}

const mapExpense = (x: ExpenseApi): TripExpense => ({
  id: x.Id,
  tripId: x.TripId,
  totalAmount: Number(x.TotalAmount),
  notes: x.Notes,
  details: (x.Details || []).map((d) => ({
    id: d.Id,
    expenseTypeId: d.ExpenseTypeId,
    expenseTypeCode: d.ExpenseTypeCode,
    amount: Number(d.Amount),
    description: d.Description
  }))
});

export const expenseService = {
  getExpense: async (tripId: string) => mapExpense(await apiClient.get<ExpenseApi>(`/api/trips/${tripId}/expense`)),
  createExpense: async (tripId: string, payload: TripExpensePayload) =>
    mapExpense(await apiClient.post<ExpenseApi, TripExpensePayload>(`/api/trips/${tripId}/expense`, payload)),
  updateExpense: async (tripId: string, payload: TripExpensePayload) =>
    mapExpense(await apiClient.put<ExpenseApi, TripExpensePayload>(`/api/trips/${tripId}/expense`, payload))
};
