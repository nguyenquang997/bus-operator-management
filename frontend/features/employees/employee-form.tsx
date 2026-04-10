"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Select } from "@/components/ui/select";
import { DEFAULT_BRANCH_ID, EMPLOYEE_TYPES } from "@/lib/domain-options";
import type { EmployeePayload } from "@/types/employee";

const defaultValues: EmployeePayload = {
  branchId: DEFAULT_BRANCH_ID,
  code: "",
  fullName: "",
  phoneNumber: "",
  employeeType: "DRIVER",
  licenseNumber: "",
  licenseClass: "",
  hireDate: null,
  status: "ACTIVE",
  isActive: true
};

export function EmployeeForm({ initialValues, onSubmit, submitLabel }: { initialValues?: EmployeePayload; onSubmit: (payload: EmployeePayload) => Promise<void>; submitLabel: string; }) {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<EmployeePayload>({ defaultValues: initialValues || defaultValues });

  return (
    <form className="grid gap-4 rounded-md border border-slate-200 bg-white p-4 md:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Ma chi nhanh" error={errors.branchId?.message}>
        <Controller
          control={control}
          name="branchId"
          rules={{ min: { value: 1, message: ">=1" } }}
          render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? 0)} />}
        />
      </FormField>
      <FormField label="Ma" error={errors.code?.message}><Input {...register("code", { required: "Bat buoc" })} /></FormField>
      <FormField label="Ho ten" error={errors.fullName?.message}><Input {...register("fullName", { required: "Bat buoc" })} /></FormField>
      <FormField label="So dien thoai"><Input {...register("phoneNumber")} /></FormField>
      <FormField label="Loai nhan vien" error={errors.employeeType?.message}><Select {...register("employeeType", { required: "Bat buoc" })}>{EMPLOYEE_TYPES.map((x) => <option key={x} value={x}>{x}</option>)}</Select></FormField>
      <FormField label="Trang thai" error={errors.status?.message}><Input {...register("status", { required: "Bat buoc" })} /></FormField>
      <FormField label="So bang lai"><Input {...register("licenseNumber")} /></FormField>
      <FormField label="Hang bang"><Input {...register("licenseClass")} /></FormField>
      <FormField label="Ngay vao lam"><Input type="date" {...register("hireDate")} /></FormField>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("isActive")} /> Dang hoat dong</label>
      <div className="md:col-span-2"><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Dang luu..." : submitLabel}</Button></div>
    </form>
  );
}
