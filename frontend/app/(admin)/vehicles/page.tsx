"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/page-state";
import { PageHeader } from "@/components/ui/page-header";
import { useToast } from "@/context/toast-context";
import { useDeleteVehicleMutation, useVehiclesQuery } from "@/hooks/queries/use-vehicles-query";
import { formatNumber } from "@/utils/format";

export default function VehiclesPage() {
  const { data, isLoading, isError } = useVehiclesQuery();
  const deleteMutation = useDeleteVehicleMutation();
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const onDelete = async (id: number) => {
    if (!confirm("Ban chac chan muon xoa xe nay?")) return;
    try {
      await deleteMutation.mutateAsync(String(id));
      showSuccess("Da xoa xe");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Xoa that bai");
    }
  };

  return (
    <div>
      <PageHeader title="Xe" description="Quan ly danh muc xe" actions={<Link href="/vehicles/new"><Button>Tao moi xe</Button></Link>} />
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState message="Khong tai duoc danh sach xe" /> : null}
      {data && data.length === 0 ? <EmptyState message="Chua co xe" /> : null}
      {data && data.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left"><tr><th className="px-3 py-2">Ma</th><th className="px-3 py-2">Bien so</th><th className="px-3 py-2">Loai</th><th className="px-3 py-2">So ghe</th><th className="px-3 py-2">Trang thai</th><th className="px-3 py-2">Thao tac</th></tr></thead>
            <tbody>
              {data.map((vehicle) => (
                <tr key={vehicle.id} className="border-t border-slate-100">
                  <td className="px-3 py-2">{vehicle.code}</td>
                  <td className="px-3 py-2">{vehicle.plateNumber}</td>
                  <td className="px-3 py-2">{vehicle.vehicleType}</td>
                  <td className="px-3 py-2">{formatNumber(vehicle.seatCount)}</td>
                  <td className="px-3 py-2">{vehicle.status}</td>
                  <td className="space-x-2 px-3 py-2"><Button className="px-3 py-1" onClick={() => router.push(`/vehicles/${vehicle.id}/edit`)}>Sua</Button><Button className="bg-red-600 px-3 py-1 hover:bg-red-700" onClick={() => onDelete(vehicle.id)}>Xoa</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
