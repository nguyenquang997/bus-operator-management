"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import type { RoutePayload } from "@/types/route";

interface RouteFormProps {
  initialValues?: RoutePayload;
  onSubmit: (payload: RoutePayload) => Promise<void>;
  submitLabel: string;
}

const defaultValues: RoutePayload = {
  code: "",
  name: "",
  fromLocation: "",
  toLocation: "",
  distanceKm: 0,
  estimatedDurationMinutes: 60,
  baseTicketPrice: 0,
  isActive: true
};

export function RouteForm({ initialValues, onSubmit, submitLabel }: RouteFormProps) {
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<RoutePayload>({ defaultValues: initialValues || defaultValues });

  return (
    <form className="grid gap-4 rounded-md border border-slate-200 bg-white p-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Ma" error={errors.code?.message}><Input {...register("code", { required: "Bat buoc" })} /></FormField>
      <FormField label="Ten" error={errors.name?.message}><Input {...register("name", { required: "Bat buoc" })} /></FormField>
      <FormField label="Diem di" error={errors.fromLocation?.message}><Input {...register("fromLocation", { required: "Bat buoc" })} /></FormField>
      <FormField label="Diem den" error={errors.toLocation?.message}><Input {...register("toLocation", { required: "Bat buoc" })} /></FormField>
      <FormField label="Khoang cach (km)" error={errors.distanceKm?.message}>
        <Controller
          control={control}
          name="distanceKm"
          rules={{ min: { value: 0, message: ">= 0" } }}
          render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? 0)} allowDecimal />}
        />
      </FormField>
      <FormField label="Thoi gian du kien (phut)" error={errors.estimatedDurationMinutes?.message}>
        <Controller
          control={control}
          name="estimatedDurationMinutes"
          rules={{ min: { value: 1, message: "> 0" } }}
          render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? 0)} />}
        />
      </FormField>
      <FormField label="Gia ve co ban" error={errors.baseTicketPrice?.message}>
        <Controller
          control={control}
          name="baseTicketPrice"
          rules={{ min: { value: 0, message: ">= 0" } }}
          render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? 0)} />}
        />
      </FormField>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("isActive")} /> Dang hoat dong</label>
      <div className="md:col-span-2"><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Dang luu..." : submitLabel}</Button></div>
    </form>
  );
}
