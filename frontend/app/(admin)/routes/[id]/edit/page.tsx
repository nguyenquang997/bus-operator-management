"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { ErrorState, LoadingState } from "@/components/ui/page-state";
import { useToast } from "@/context/toast-context";
import { RouteForm } from "@/features/routes/route-form";
import { useRouteQuery, useUpdateRouteMutation } from "@/hooks/queries/use-routes-query";
import type { RoutePayload } from "@/types/route";

export default function EditRoutePage({ params }: { params: { id: string } }) {
  const { data, isLoading, isError } = useRouteQuery(params.id);
  const mutation = useUpdateRouteMutation(params.id);
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const onSubmit = async (payload: RoutePayload) => {
    try {
      await mutation.mutateAsync(payload);
      showSuccess("Da cap nhat tuyen");
      router.push("/routes");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Cap nhat that bai");
    }
  };

  return (
    <div>
      <PageHeader title="Sua tuyen" />
      {isLoading ? <LoadingState /> : null}
      {isError || !data ? <ErrorState message="Khong tai duoc tuyen" /> : null}
      {data ? <RouteForm initialValues={{ code: data.code, name: data.name, fromLocation: data.fromLocation, toLocation: data.toLocation, distanceKm: data.distanceKm, estimatedDurationMinutes: data.estimatedDurationMinutes, baseTicketPrice: data.baseTicketPrice, isActive: data.isActive }} onSubmit={onSubmit} submitLabel="Cap nhat" /> : null}
    </div>
  );
}
