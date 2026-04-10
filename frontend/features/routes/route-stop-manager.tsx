"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Select } from "@/components/ui/select";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/page-state";
import {
  useCreateRouteStopMutation,
  useDeleteRouteStopMutation,
  useRouteStopsQuery,
  useUpdateRouteStopMutation
} from "@/hooks/queries/use-routes-query";
import { useToast } from "@/context/toast-context";
import type { RouteStopPayload } from "@/types/route";
import { formatNumber } from "@/utils/format";

const initial: RouteStopPayload = {
  stopOrder: 1,
  stopName: "",
  address: "",
  stopType: "PICKUP",
  estimatedOffsetMinutes: 0,
  isActive: true
};

export function RouteStopManager({ routeId }: { routeId: string }) {
  const { data, isLoading, isError } = useRouteStopsQuery(routeId);
  const createMutation = useCreateRouteStopMutation(routeId);
  const updateMutation = useUpdateRouteStopMutation(routeId);
  const deleteMutation = useDeleteRouteStopMutation(routeId);
  const { showError, showSuccess } = useToast();
  const [editingId, setEditingId] = useState<number | null>(null);

  const createForm = useForm<RouteStopPayload>({ defaultValues: initial });
  const editForm = useForm<RouteStopPayload>({ defaultValues: initial });

  const onCreate = async (payload: RouteStopPayload) => {
    try {
      await createMutation.mutateAsync(payload);
      showSuccess("Da tao diem dung");
      createForm.reset(initial);
    } catch (error) {
      showError(error instanceof Error ? error.message : "Tao that bai");
    }
  };

  const onUpdate = async (payload: RouteStopPayload) => {
    if (!editingId) return;
    try {
      await updateMutation.mutateAsync({ id: String(editingId), payload });
      showSuccess("Da cap nhat diem dung");
      setEditingId(null);
      editForm.reset(initial);
    } catch (error) {
      showError(error instanceof Error ? error.message : "Cap nhat that bai");
    }
  };

  const onDelete = async (id: number) => {
    if (!confirm("Ban chac chan muon xoa diem dung nay?")) return;
    try {
      await deleteMutation.mutateAsync(String(id));
      showSuccess("Da xoa diem dung");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Xoa that bai");
    }
  };

  if (isLoading) return <LoadingState />;
  if (isError) return <ErrorState message="Khong tai duoc diem dung" />;

  const stops = [...(data || [])].sort((a, b) => a.stopOrder - b.stopOrder);

  return (
    <div className="space-y-4">
      <form className="grid gap-3 rounded-md border border-slate-200 bg-white p-4 md:grid-cols-6" onSubmit={createForm.handleSubmit(onCreate)}>
        <FormField label="Ten diem dung" error={createForm.formState.errors.stopName?.message}><Input {...createForm.register("stopName", { required: "Bat buoc" })} /></FormField>
        <FormField label="Thu tu" error={createForm.formState.errors.stopOrder?.message}>
          <Controller
            control={createForm.control}
            name="stopOrder"
            rules={{ min: { value: 1, message: ">= 1" } }}
            render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? 1)} />}
          />
        </FormField>
        <FormField label="Loai" error={createForm.formState.errors.stopType?.message}><Select {...createForm.register("stopType", { required: "Bat buoc" })}><option value="PICKUP">PICKUP</option><option value="DROPOFF">DROPOFF</option><option value="BOTH">BOTH</option></Select></FormField>
        <FormField label="Do lech (phut)">
          <Controller
            control={createForm.control}
            name="estimatedOffsetMinutes"
            render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? 0)} />}
          />
        </FormField>
        <FormField label="Dia chi"><Input {...createForm.register("address")} /></FormField>
        <div className="flex items-end"><Button type="submit" disabled={createMutation.isPending}>Them diem dung</Button></div>
      </form>

      {stops.length === 0 ? <EmptyState message="Chua co diem dung" /> : (
        <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left"><tr><th className="px-3 py-2">Thu tu</th><th className="px-3 py-2">Ten</th><th className="px-3 py-2">Loai</th><th className="px-3 py-2">Do lech</th><th className="px-3 py-2">Dia chi</th><th className="px-3 py-2">Thao tac</th></tr></thead>
            <tbody>
              {stops.map((stop) => {
                const isEditing = stop.id === editingId;
                return (
                  <tr key={stop.id} className="border-t border-slate-100">
                    <td className="px-3 py-2">
                      {isEditing ? (
                        <Controller
                          control={editForm.control}
                          name="stopOrder"
                          render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? 1)} />}
                        />
                      ) : formatNumber(stop.stopOrder)}
                    </td>
                    <td className="px-3 py-2">{isEditing ? <Input {...editForm.register("stopName", { required: true })} /> : stop.stopName}</td>
                    <td className="px-3 py-2">{isEditing ? <Select {...editForm.register("stopType", { required: true })}><option value="PICKUP">PICKUP</option><option value="DROPOFF">DROPOFF</option><option value="BOTH">BOTH</option></Select> : stop.stopType}</td>
                    <td className="px-3 py-2">
                      {isEditing ? (
                        <Controller
                          control={editForm.control}
                          name="estimatedOffsetMinutes"
                          render={({ field }) => <NumberInput value={field.value} onValueChange={(v) => field.onChange(v ?? 0)} />}
                        />
                      ) : (typeof stop.estimatedOffsetMinutes === "number" ? formatNumber(stop.estimatedOffsetMinutes) : "-")}
                    </td>
                    <td className="px-3 py-2">{isEditing ? <Input {...editForm.register("address")} /> : (stop.address || "-")}</td>
                    <td className="space-x-2 px-3 py-2">
                      {isEditing ? (
                        <>
                          <Button className="px-3 py-1" onClick={editForm.handleSubmit(onUpdate)}>Luu</Button>
                          <Button className="bg-slate-500 px-3 py-1 hover:bg-slate-600" onClick={() => { setEditingId(null); editForm.reset(initial); }}>Huy</Button>
                        </>
                      ) : (
                        <>
                          <Button className="px-3 py-1" onClick={() => { setEditingId(stop.id); editForm.reset({ stopOrder: stop.stopOrder, stopName: stop.stopName, stopType: stop.stopType, address: stop.address || "", estimatedOffsetMinutes: stop.estimatedOffsetMinutes ?? 0, isActive: stop.isActive }); }}>Sua</Button>
                          <Button className="bg-red-600 px-3 py-1 hover:bg-red-700" onClick={() => onDelete(stop.id)}>Xoa</Button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
