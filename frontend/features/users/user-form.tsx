"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { APP_ROLES, DEFAULT_BRANCH_ID } from "@/lib/domain-options";
import type { UserPayload } from "@/types/user";

const defaultValues: UserPayload = {
  branchId: DEFAULT_BRANCH_ID,
  username: "",
  password: "",
  fullName: "",
  email: "",
  phoneNumber: "",
  isActive: true,
  roleCodes: ["OPERATOR"]
};

interface UserFormProps {
  onSubmit: (payload: UserPayload) => Promise<void>;
  submitLabel: string;
}

export function UserForm({ onSubmit, submitLabel }: UserFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UserPayload>({ defaultValues });

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

      <FormField label="Ten dang nhap" error={errors.username?.message}>
        <Input {...register("username", { required: "Bat buoc" })} />
      </FormField>

      <FormField label="Mat khau" error={errors.password?.message}>
        <Input type="password" {...register("password", { required: "Bat buoc", minLength: { value: 6, message: "Toi thieu 6 ky tu" } })} />
      </FormField>

      <FormField label="Ho ten" error={errors.fullName?.message}>
        <Input {...register("fullName", { required: "Bat buoc" })} />
      </FormField>

      <FormField label="Email" error={errors.email?.message}>
        <Input type="email" {...register("email")} />
      </FormField>

      <FormField label="So dien thoai" error={errors.phoneNumber?.message}>
        <Input {...register("phoneNumber")} />
      </FormField>

      <FormField label="Vai tro" error={errors.roleCodes?.message}>
        <div className="grid grid-cols-2 gap-2 rounded-md border border-slate-200 p-3">
          {APP_ROLES.map((role) => (
            <label key={role} className="flex items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                value={role}
                {...register("roleCodes", {
                  validate: (value) => (value?.length ?? 0) > 0 || "Chon it nhat 1 vai tro"
                })}
              />
              {role}
            </label>
          ))}
        </div>
        <p className="mt-1 text-xs text-slate-500">Can tao/sua danh muc nhan vien, chon ADMIN hoac OPERATOR.</p>
      </FormField>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("isActive")} /> Dang hoat dong
      </label>

      <div className="md:col-span-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Dang luu..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
