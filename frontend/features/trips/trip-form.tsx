"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Select } from "@/components/ui/select";
import { DEFAULT_BRANCH_ID, TRIP_STATUSES } from "@/lib/domain-options";
import type { Employee } from "@/types/employee";
import type { Route } from "@/types/route";
import type { TripPayload } from "@/types/trip";
import type { Vehicle } from "@/types/vehicle";

const defaultValues: TripPayload = {
  branchId: DEFAULT_BRANCH_ID,
  tripCode: "",
  routeId: 0,
  vehicleId: 0,
  driverId: 0,
  assistantId: null,
  departureDate: "",
  departureTime: "",
  estimatedArrivalTime: null,
  bookingOpenTime: null,
  bookingCloseTime: null,
  allowOnlineBooking: true,
  status: "SCHEDULED",
  notes: ""
};

interface TripFormProps {
  initialValues?: TripPayload;
  onSubmit: (payload: TripPayload) => Promise<void>;
  submitLabel: string;
  routes: Route[];
  vehicles: Vehicle[];
  employees: Employee[];
}

export function TripForm({ initialValues, onSubmit, submitLabel, routes, vehicles, employees }: TripFormProps) {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<TripPayload>({ defaultValues: initialValues || defaultValues });

  const drivers = employees.filter((x) => x.employeeType === "DRIVER");
  const assistants = employees.filter((x) => x.employeeType === "ASSISTANT");

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
      <FormField label="Ma chuyen" error={errors.tripCode?.message}><Input {...register("tripCode", { required: "Bat buoc" })} /></FormField>
      <FormField label="Ngay khoi hanh" error={errors.departureDate?.message}><Input type="date" {...register("departureDate", { required: "Bat buoc" })} /></FormField>
      <FormField label="Gio khoi hanh" error={errors.departureTime?.message}><Input type="time" {...register("departureTime", { required: "Bat buoc" })} /></FormField>
      <FormField label="Gio den du kien"><Input type="time" {...register("estimatedArrivalTime")} /></FormField>
      <FormField label="Tuyen" error={errors.routeId?.message}><Select {...register("routeId", { valueAsNumber: true, min: { value: 1, message: "Chon tuyen" } })}><option value="0">-- Chon tuyen --</option>{routes.map((route) => <option key={route.id} value={route.id}>{route.name}</option>)}</Select></FormField>
      <FormField label="Xe" error={errors.vehicleId?.message}><Select {...register("vehicleId", { valueAsNumber: true, min: { value: 1, message: "Chon xe" } })}><option value="0">-- Chon xe --</option>{vehicles.map((vehicle) => <option key={vehicle.id} value={vehicle.id}>{vehicle.plateNumber}</option>)}</Select></FormField>
      <FormField label="Tai xe" error={errors.driverId?.message}><Select {...register("driverId", { valueAsNumber: true, min: { value: 1, message: "Chon tai xe" } })}><option value="0">-- Chon tai xe --</option>{drivers.map((employee) => <option key={employee.id} value={employee.id}>{employee.fullName}</option>)}</Select></FormField>
      <FormField label="Phu xe"><Select {...register("assistantId", { setValueAs: (v) => (v ? Number(v) : null) })}><option value="">-- Chon phu xe --</option>{assistants.map((employee) => <option key={employee.id} value={employee.id}>{employee.fullName}</option>)}</Select></FormField>
      <FormField label="Trang thai" error={errors.status?.message}><Select {...register("status", { required: "Bat buoc" })}>{TRIP_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}</Select></FormField>
      <FormField label="Mo ban ve"><Input type="datetime-local" {...register("bookingOpenTime")} /></FormField>
      <FormField label="Dong ban ve"><Input type="datetime-local" {...register("bookingCloseTime")} /></FormField>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("allowOnlineBooking")} /> Cho phep dat online</label>
      <FormField label="Ghi chu"><Input {...register("notes")} /></FormField>
      <div className="md:col-span-2"><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Dang luu..." : submitLabel}</Button></div>
    </form>
  );
}
