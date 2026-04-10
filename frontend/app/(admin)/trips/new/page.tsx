"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { ErrorState, LoadingState } from "@/components/ui/page-state";
import { useToast } from "@/context/toast-context";
import { TripForm } from "@/features/trips/trip-form";
import { useEmployeesQuery } from "@/hooks/queries/use-employees-query";
import { useRoutesQuery } from "@/hooks/queries/use-routes-query";
import { useCreateTripMutation } from "@/hooks/queries/use-trips-query";
import { useVehiclesQuery } from "@/hooks/queries/use-vehicles-query";
import type { TripPayload } from "@/types/trip";

export default function NewTripPage() {
  const routesQuery = useRoutesQuery();
  const vehiclesQuery = useVehiclesQuery();
  const employeesQuery = useEmployeesQuery();
  const mutation = useCreateTripMutation();
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const onSubmit = async (payload: TripPayload) => {
    try {
      await mutation.mutateAsync(payload);
      showSuccess("Tao chuyen thanh cong");
      router.push("/trips");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Tao chuyen that bai");
    }
  };

  if (routesQuery.isLoading || vehiclesQuery.isLoading || employeesQuery.isLoading) return <LoadingState />;
  if (routesQuery.isError || vehiclesQuery.isError || employeesQuery.isError) return <ErrorState message="Khong tai duoc du lieu form chuyen" />;

  return (
    <div>
      <PageHeader title="Tao moi chuyen" />
      <TripForm onSubmit={onSubmit} submitLabel="Tao moi" routes={routesQuery.data || []} vehicles={vehiclesQuery.data || []} employees={employeesQuery.data || []} />
    </div>
  );
}
