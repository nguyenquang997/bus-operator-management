"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ErrorState, LoadingState } from "@/components/ui/page-state";
import { useToast } from "@/context/toast-context";
import { RevenueForm } from "@/features/revenue/revenue-form";
import { useCreateRevenueMutation, useRevenueQuery, useUpdateRevenueMutation } from "@/hooks/queries/use-revenue-query";
import { useTripQuery } from "@/hooks/queries/use-trips-query";
import type { TripRevenuePayload } from "@/types/revenue";
import { formatNumber } from "@/utils/format";

export default function TripRevenuePage({ params }: { params: { id: string } }) {
  const tripQuery = useTripQuery(params.id);
  const revenueQuery = useRevenueQuery(params.id);
  const createMutation = useCreateRevenueMutation(params.id);
  const updateMutation = useUpdateRevenueMutation(params.id);
  const { showSuccess, showError } = useToast();

  const hasRevenue = !!revenueQuery.data;

  const onSubmit = async (payload: TripRevenuePayload) => {
    try {
      if (hasRevenue) await updateMutation.mutateAsync(payload);
      else await createMutation.mutateAsync(payload);
      showSuccess("Da luu doanh thu");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Luu doanh thu that bai");
    }
  };

  if (tripQuery.isLoading || revenueQuery.isLoading) return <LoadingState />;
  if (!tripQuery.data || tripQuery.isError) return <ErrorState message="Khong tai duoc chuyen" />;

  const initialValues = revenueQuery.data
    ? {
        RevenueSourceType: revenueQuery.data.revenueSourceType || "MANUAL",
        PassengerCountActual: revenueQuery.data.passengerCountActual ?? null,
        Notes: revenueQuery.data.notes || "",
        Details: revenueQuery.data.details.map((d) => ({ RevenueTypeId: d.revenueTypeId, Amount: d.amount, Description: d.description || "" }))
      }
    : undefined;

  return (
    <div className="space-y-4">
      <PageHeader title={`Doanh thu chuyen - ${tripQuery.data.tripCode}`} description={`Tuyen: ${tripQuery.data.routeName || formatNumber(tripQuery.data.routeId)}`} />
      <RevenueForm initialValues={initialValues} onSubmit={onSubmit} submitLabel={hasRevenue ? "Cap nhat doanh thu" : "Tao doanh thu"} />
    </div>
  );
}
