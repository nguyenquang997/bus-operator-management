"use client";

import { useMemo } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Select } from "@/components/ui/select";
import { EXPENSE_TYPE_OPTIONS } from "@/lib/domain-options";
import { formatCurrency } from "@/utils/format";
import type { TripExpensePayload } from "@/types/expense";

interface ExpenseFormValues {
  Notes?: string;
  Details: { ExpenseTypeId: number; Amount: number; Description?: string }[];
}

const defaultValues: ExpenseFormValues = {
  Notes: "",
  Details: [{ ExpenseTypeId: 1, Amount: 0, Description: "" }]
};

export function ExpenseForm({
  initialValues,
  onSubmit,
  submitLabel
}: {
  initialValues?: TripExpensePayload;
  onSubmit: (payload: TripExpensePayload) => Promise<void>;
  submitLabel: string;
}) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<ExpenseFormValues>({ defaultValues: initialValues || defaultValues });

  const { fields, append, remove } = useFieldArray({ control, name: "Details" });
  const detailValues = watch("Details");
  const totalAmount = useMemo(
    () => detailValues?.reduce((sum, row) => sum + (Number(row.Amount) || 0), 0) ?? 0,
    [detailValues]
  );

  return (
    <form className="space-y-4 rounded-md border border-slate-200 bg-white p-4" onSubmit={handleSubmit((values) => onSubmit(values))}>
      <FormField label="Ghi chú">
        <Input {...register("Notes")} />
      </FormField>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="grid gap-3 rounded-md border border-slate-200 p-3 md:grid-cols-12">
            <div className="md:col-span-4">
              <FormField label="Loai chi phi" error={errors.Details?.[index]?.ExpenseTypeId?.message}>
                <Select {...register(`Details.${index}.ExpenseTypeId`, { valueAsNumber: true, min: { value: 1, message: "Bat buoc" } })}>
                  {EXPENSE_TYPE_OPTIONS.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.id} - {type.label}
                    </option>
                  ))}
                </Select>
              </FormField>
            </div>
            <div className="md:col-span-3">
              <FormField label="So tien" error={errors.Details?.[index]?.Amount?.message}>
                <Controller
                  control={control}
                  name={`Details.${index}.Amount`}
                  rules={{ min: { value: 0, message: ">=0" } }}
                  render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? 0)} />}
                />
              </FormField>
            </div>
            <div className="md:col-span-4">
              <FormField label="Mo ta">
                <Input {...register(`Details.${index}.Description`)} />
              </FormField>
            </div>
            <div className="md:col-span-1 flex items-end">
              <Button type="button" className="bg-red-600 px-3 hover:bg-red-700" onClick={() => remove(index)}>
                -
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button type="button" className="bg-slate-700 hover:bg-slate-800" onClick={() => append({ ExpenseTypeId: 1, Amount: 0, Description: "" })}>
        Thêm dòng
      </Button>

      <div className="rounded-md bg-brand-50 p-3 text-sm text-brand-700">Tong tien: {formatCurrency(totalAmount)}</div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Dang luu..." : submitLabel}
      </Button>
    </form>
  );
}
