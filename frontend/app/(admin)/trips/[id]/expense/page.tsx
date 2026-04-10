"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ErrorState, LoadingState } from "@/components/ui/page-state";
import { useToast } from "@/context/toast-context";
import { ExpenseForm } from "@/features/expense/expense-form";
import { useCreateExpenseMutation, useExpenseQuery, useUpdateExpenseMutation } from "@/hooks/queries/use-expense-query";
import { useTripQuery } from "@/hooks/queries/use-trips-query";
import type { TripExpensePayload } from "@/types/expense";
import { formatNumber } from "@/utils/format";

export default function TripExpensePage({ params }: { params: { id: string } }) {
  const tripQuery = useTripQuery(params.id);
  const expenseQuery = useExpenseQuery(params.id);
  const createMutation = useCreateExpenseMutation(params.id);
  const updateMutation = useUpdateExpenseMutation(params.id);
  const { showSuccess, showError } = useToast();

  const hasExpense = !!expenseQuery.data;

  const onSubmit = async (payload: TripExpensePayload) => {
    try {
      if (hasExpense) await updateMutation.mutateAsync(payload);
      else await createMutation.mutateAsync(payload);
      showSuccess("Da luu chi phi");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Luu chi phi that bai");
    }
  };

  if (tripQuery.isLoading || expenseQuery.isLoading) return <LoadingState />;
  if (!tripQuery.data || tripQuery.isError) return <ErrorState message="Khong tai duoc chuyen" />;

  const initialValues = expenseQuery.data
    ? {
        Notes: expenseQuery.data.notes || "",
        Details: expenseQuery.data.details.map((d) => ({ ExpenseTypeId: d.expenseTypeId, Amount: d.amount, Description: d.description || "" }))
      }
    : undefined;

  return (
    <div className="space-y-4">
      <PageHeader title={`Chi phi chuyen - ${tripQuery.data.tripCode}`} description={`Tuyen: ${tripQuery.data.routeName || formatNumber(tripQuery.data.routeId)}`} />
      <ExpenseForm initialValues={initialValues} onSubmit={onSubmit} submitLabel={hasExpense ? "Cap nhat chi phi" : "Tao chi phi"} />
    </div>
  );
}
