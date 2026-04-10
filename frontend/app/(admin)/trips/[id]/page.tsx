"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { ErrorState, LoadingState } from "@/components/ui/page-state";
import { Select } from "@/components/ui/select";
import { useToast } from "@/context/toast-context";
import { TRIP_STATUSES } from "@/lib/domain-options";
import { useTripQuery, useUpdateTripStatusMutation } from "@/hooks/queries/use-trips-query";
import type { TripStatus } from "@/types/trip";
import { formatDateTime, formatNumber } from "@/utils/format";

export default function TripDetailPage({ params }: { params: { id: string } }) {
  const { data, isLoading, isError } = useTripQuery(params.id);
  const statusMutation = useUpdateTripStatusMutation(params.id);
  const { showSuccess, showError } = useToast();
  const [status, setStatus] = useState<TripStatus>("SCHEDULED");

  useEffect(() => {
    if (data?.status) setStatus(data.status);
  }, [data?.status]);

  const submitStatus = async () => {
    try {
      await statusMutation.mutateAsync(status);
      showSuccess("Da cap nhat trang thai");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Cap nhat trang thai that bai");
    }
  };

  if (isLoading) return <LoadingState />;
  if (isError || !data) return <ErrorState message="Khong tai duoc chi tiet chuyen" />;

  return (
    <div className="space-y-4">
      <PageHeader title={`Chi tiet chuyen ${data.tripCode}`} />
      <div className="rounded-md border border-slate-200 bg-white p-4 text-sm">
        <p><strong>Tuyen:</strong> {data.routeName || formatNumber(data.routeId)}</p>
        <p><strong>Xe:</strong> {data.vehiclePlateNumber || formatNumber(data.vehicleId)}</p>
        <p><strong>Tai xe:</strong> {data.driverName || formatNumber(data.driverId)}</p>
        <p><strong>Khoi hanh:</strong> {formatDateTime(data.departureAtDisplay)}</p>
        <p><strong>Trang thai:</strong> {data.status}</p>
      </div>
      <div className="flex flex-wrap items-end gap-3 rounded-md border border-slate-200 bg-white p-4">
        <div className="w-64">
          <p className="mb-1 text-sm font-medium">Cap nhat trang thai</p>
          <Select value={status} onChange={(e) => setStatus(e.target.value as TripStatus)}>
            {TRIP_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </Select>
        </div>
        <Button onClick={submitStatus} disabled={statusMutation.isPending}>Cap nhat trang thai</Button>
      </div>
      <div className="flex gap-2">
        <Link href={`/trips/${data.id}/revenue`}><Button>Doanh thu</Button></Link>
        <Link href={`/trips/${data.id}/expense`}><Button className="bg-slate-700 hover:bg-slate-800">Chi phi</Button></Link>
      </div>
    </div>
  );
}
