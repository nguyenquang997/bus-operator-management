"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { ErrorState, LoadingState } from "@/components/ui/page-state";
import { useToast } from "@/context/toast-context";
import { VehicleForm } from "@/features/vehicles/vehicle-form";
import { useUpdateVehicleMutation, useVehicleQuery } from "@/hooks/queries/use-vehicles-query";
import type { VehiclePayload } from "@/types/vehicle";

export default function EditVehiclePage({ params }: { params: { id: string } }) {
  const { data, isLoading, isError } = useVehicleQuery(params.id);
  const mutation = useUpdateVehicleMutation(params.id);
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const onSubmit = async (payload: VehiclePayload) => {
    try {
      await mutation.mutateAsync(payload);
      showSuccess("Da cap nhat xe");
      router.push("/vehicles");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Cap nhat that bai");
    }
  };

  return (
    <div>
      <PageHeader title="Sua xe" />
      {isLoading ? <LoadingState /> : null}
      {isError || !data ? <ErrorState message="Khong tai duoc xe" /> : null}
      {data ? <VehicleForm initialValues={{ branchId: data.branchId, code: data.code, plateNumber: data.plateNumber, vehicleType: data.vehicleType, brand: data.brand, model: data.model, seatCount: data.seatCount, yearOfManufacture: data.yearOfManufacture, status: data.status, isActive: data.isActive }} onSubmit={onSubmit} submitLabel="Cap nhat" /> : null}
    </div>
  );
}
