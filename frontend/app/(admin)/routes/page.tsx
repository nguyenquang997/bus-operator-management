"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/page-state";
import { PageHeader } from "@/components/ui/page-header";
import { useToast } from "@/context/toast-context";
import { useDeleteRouteMutation, useRoutesQuery } from "@/hooks/queries/use-routes-query";
import { formatNumber } from "@/utils/format";

export default function RoutesPage() {
  const { data, isLoading, isError } = useRoutesQuery();
  const deleteMutation = useDeleteRouteMutation();
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const onDelete = async (id: number) => {
    if (!confirm("Ban chac chan muon xoa tuyen nay?")) return;
    try {
      await deleteMutation.mutateAsync(String(id));
      showSuccess("Da xoa tuyen");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Xoa that bai");
    }
  };

  return (
    <div>
      <PageHeader title="Tuyen xe" description="Quan ly danh muc tuyen" actions={<Link href="/routes/new"><Button>Tao moi tuyen</Button></Link>} />
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState message="Khong tai duoc danh sach tuyen" /> : null}
      {data && data.length === 0 ? <EmptyState message="Chua co tuyen" /> : null}
      {data && data.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left"><tr><th className="px-3 py-2">Ma</th><th className="px-3 py-2">Ten</th><th className="px-3 py-2">Diem di - Diem den</th><th className="px-3 py-2">Khoang cach</th><th className="px-3 py-2">Thao tac</th></tr></thead>
            <tbody>
              {data.map((route) => (
                <tr key={route.id} className="border-t border-slate-100">
                  <td className="px-3 py-2">{route.code}</td>
                  <td className="px-3 py-2">{route.name}</td>
                  <td className="px-3 py-2">{route.fromLocation} - {route.toLocation}</td>
                  <td className="px-3 py-2">{formatNumber(route.distanceKm, 1)} km</td>
                  <td className="space-x-2 px-3 py-2"><Button className="px-3 py-1" onClick={() => router.push(`/routes/${route.id}/edit`)}>Sua</Button><Button className="bg-slate-700 px-3 py-1 hover:bg-slate-800" onClick={() => router.push(`/routes/${route.id}/stops`)}>Diem dung</Button><Button className="bg-red-600 px-3 py-1 hover:bg-red-700" onClick={() => onDelete(route.id)}>Xoa</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
