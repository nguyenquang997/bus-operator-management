"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { ErrorState, LoadingState } from "@/components/ui/page-state";
import { useToast } from "@/context/toast-context";
import { TripForm } from "@/features/trips/trip-form";
import { useEmployeesQuery } from "@/hooks/queries/use-employees-query";
import { useRoutesQuery } from "@/hooks/queries/use-routes-query";
import { useTripQuery, useUpdateTripMutation } from "@/hooks/queries/use-trips-query";
import { useVehiclesQuery } from "@/hooks/queries/use-vehicles-query";
import type { TripPayload } from "@/types/trip";

export default function EditTripPage({ params }: { params: { id: string } }) {
  const tripQuery = useTripQuery(params.id);
  const routesQuery = useRoutesQuery();
  const vehiclesQuery = useVehiclesQuery();
  const employeesQuery = useEmployeesQuery();
  const mutation = useUpdateTripMutation(params.id);
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const onSubmit = async (payload: TripPayload) => {
    try {
      await mutation.mutateAsync(payload);
      showSuccess("Da cap nhat chuyen");
      router.push("/trips");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Cap nhat that bai");
    }
  };

  if (tripQuery.isLoading || routesQuery.isLoading || vehiclesQuery.isLoading || employeesQuery.isLoading) return <LoadingState />;
  if (!tripQuery.data || tripQuery.isError || routesQuery.isError || vehiclesQuery.isError || employeesQuery.isError) return <ErrorState message="Khong tai duoc du lieu form chuyen" />;

  return (
    <div>
      <PageHeader title="Sua chuyen" />
      <TripForm
        initialValues={{
          branchId: tripQuery.data.branchId,
          tripCode: tripQuery.data.tripCode,
          routeId: tripQuery.data.routeId,
          vehicleId: tripQuery.data.vehicleId,
          driverId: tripQuery.data.driverId,
          assistantId: tripQuery.data.assistantId ?? null,
          departureDate: tripQuery.data.departureDate,
          departureTime: tripQuery.data.departureTime,
          estimatedArrivalTime: tripQuery.data.estimatedArrivalTime || null,
          bookingOpenTime: tripQuery.data.bookingOpenTime || null,
          bookingCloseTime: tripQuery.data.bookingCloseTime || null,
          allowOnlineBooking: tripQuery.data.allowOnlineBooking,
          status: tripQuery.data.status,
          notes: tripQuery.data.notes || ""
        }}
        onSubmit={onSubmit}
        submitLabel="Cap nhat"
        routes={routesQuery.data || []}
        vehicles={vehiclesQuery.data || []}
        employees={employeesQuery.data || []}
      />
    </div>
  );
}
