import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/queries/query-keys";
import { expenseService } from "@/services/expense.service";
import { ApiError } from "@/services/api-client";
import type { TripExpensePayload } from "@/types/expense";

export function useExpenseQuery(tripId: string) {
  return useQuery({
    queryKey: queryKeys.expense(tripId),
    queryFn: async () => {
      try {
        return await expenseService.getExpense(tripId);
      } catch (error) {
        if (error instanceof ApiError && error.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!tripId,
    retry: false
  });
}

export function useCreateExpenseMutation(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: TripExpensePayload) => expenseService.createExpense(tripId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.expense(tripId) })
  });
}

export function useUpdateExpenseMutation(tripId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: TripExpensePayload) => expenseService.updateExpense(tripId, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.expense(tripId) })
  });
}
