"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/page-state";
import { PageHeader } from "@/components/ui/page-header";
import { useTripsQuery } from "@/hooks/queries/use-trips-query";
import { formatDateTime, formatNumber } from "@/utils/format";

export default function TripsPage() {
  const { data, isLoading, isError } = useTripsQuery();
  const router = useRouter();

  return (
    <div>
      <PageHeader title="Chuyen xe" description="Quan ly lich chay" actions={<Link href="/trips/new"><Button>Tao moi chuyen</Button></Link>} />
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState message="Khong tai duoc danh sach chuyen" /> : null}
      {data && data.length === 0 ? <EmptyState message="Chua co chuyen" /> : null}
      {data && data.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left"><tr><th className="px-3 py-2">Ma chuyen</th><th className="px-3 py-2">Tuyen</th><th className="px-3 py-2">Xe</th><th className="px-3 py-2">Khoi hanh</th><th className="px-3 py-2">Trang thai</th><th className="px-3 py-2">Thao tac</th></tr></thead>
            <tbody>
              {data.map((trip) => (
                <tr key={trip.id} className="border-t border-slate-100">
                  <td className="px-3 py-2">{trip.tripCode}</td>
                  <td className="px-3 py-2">{trip.routeName || formatNumber(trip.routeId)}</td>
                  <td className="px-3 py-2">{trip.vehiclePlateNumber || formatNumber(trip.vehicleId)}</td>
                  <td className="px-3 py-2">{formatDateTime(trip.departureAtDisplay)}</td>
                  <td className="px-3 py-2">{trip.status}</td>
                  <td className="space-x-2 px-3 py-2"><Button className="px-3 py-1" onClick={() => router.push(`/trips/${trip.id}`)}>Chi tiet</Button><Button className="bg-slate-700 px-3 py-1 hover:bg-slate-800" onClick={() => router.push(`/trips/${trip.id}/edit`)}>Sua</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
