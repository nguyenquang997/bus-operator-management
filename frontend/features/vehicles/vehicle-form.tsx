"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Select } from "@/components/ui/select";
import { useToast } from "@/context/toast-context";
import { DEFAULT_BRANCH_ID, VEHICLE_STATUSES } from "@/lib/domain-options";
import type { VehiclePayload } from "@/types/vehicle";

const defaultValues: VehiclePayload = {
  branchId: DEFAULT_BRANCH_ID,
  code: "",
  plateNumber: "",
  vehicleType: "SEAT_BUS",
  brand: "",
  model: "",
  seatCount: 16,
  yearOfManufacture: null,
  status: "ACTIVE",
  isActive: true
};

export function VehicleForm({ initialValues, onSubmit, submitLabel }: { initialValues?: VehiclePayload; onSubmit: (payload: VehiclePayload) => Promise<void>; submitLabel: string; }) {
  const { showWarning } = useToast();
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<VehiclePayload>({ defaultValues: initialValues || defaultValues });

  return (
    <form className="grid gap-4 rounded-md border border-slate-200 bg-white p-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit, () => showWarning("Vui long kiem tra cac truong bat buoc"))}>
      <FormField label="Ma chi nhanh" error={errors.branchId?.message}>
        <Controller
          control={control}
          name="branchId"
          rules={{ min: { value: 1, message: ">=1" } }}
          render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? 0)} />}
        />
      </FormField>
      <FormField label="Ma" error={errors.code?.message}><Input {...register("code", { required: "Bat buoc" })} /></FormField>
      <FormField label="Bien so" error={errors.plateNumber?.message}><Input {...register("plateNumber", { required: "Bat buoc" })} /></FormField>
      <FormField label="Loai xe" error={errors.vehicleType?.message}><Input {...register("vehicleType", { required: "Bat buoc" })} /></FormField>
      <FormField label="Hang xe"><Input {...register("brand")} /></FormField>
      <FormField label="Model"><Input {...register("model")} /></FormField>
      <FormField label="So ghe" error={errors.seatCount?.message}>
        <Controller
          control={control}
          name="seatCount"
          rules={{ min: { value: 1, message: ">=1" } }}
          render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? 0)} />}
        />
      </FormField>
      <FormField label="Nam san xuat">
        <Controller
          control={control}
          name="yearOfManufacture"
          render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? null)} />}
        />
      </FormField>
      <FormField label="Trang thai" error={errors.status?.message}><Select {...register("status", { required: "Bat buoc" })}>{VEHICLE_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}</Select></FormField>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("isActive")} /> Dang hoat dong</label>
      <div className="md:col-span-2"><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Dang luu..." : submitLabel}</Button></div>
    </form>
  );
}
