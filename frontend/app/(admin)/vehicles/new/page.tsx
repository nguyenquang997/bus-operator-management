"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { useToast } from "@/context/toast-context";
import { VehicleForm } from "@/features/vehicles/vehicle-form";
import { useCreateVehicleMutation } from "@/hooks/queries/use-vehicles-query";
import type { VehiclePayload } from "@/types/vehicle";

export default function NewVehiclePage() {
  const mutation = useCreateVehicleMutation();
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const onSubmit = async (payload: VehiclePayload) => {
    try {
      await mutation.mutateAsync(payload);
      showSuccess("Tao xe thanh cong");
      router.push("/vehicles");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Loi API");
    }
  };

  return (
    <div>
      <PageHeader title="Tao moi xe" />
      <VehicleForm onSubmit={onSubmit} submitLabel="Tao moi" />
    </div>
  );
}
