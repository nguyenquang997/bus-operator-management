"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/page-state";
import { PageHeader } from "@/components/ui/page-header";
import { useToast } from "@/context/toast-context";
import { useDeleteEmployeeMutation, useEmployeesQuery } from "@/hooks/queries/use-employees-query";

export default function EmployeesPage() {
  const { data, isLoading, isError } = useEmployeesQuery();
  const deleteMutation = useDeleteEmployeeMutation();
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const onDelete = async (id: number) => {
    if (!confirm("Ban chac chan muon xoa nhan vien nay?")) return;
    try {
      await deleteMutation.mutateAsync(String(id));
      showSuccess("Da xoa nhan vien");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Xoa that bai");
    }
  };

  return (
    <div>
      <PageHeader title="Nhan vien" description="Quan ly danh muc nhan vien" actions={<Link href="/employees/new"><Button>Tao moi nhan vien</Button></Link>} />
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState message="Khong tai duoc danh sach nhan vien" /> : null}
      {data && data.length === 0 ? <EmptyState message="Chua co nhan vien" /> : null}
      {data && data.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left"><tr><th className="px-3 py-2">Ma</th><th className="px-3 py-2">Ten</th><th className="px-3 py-2">Loai</th><th className="px-3 py-2">Dien thoai</th><th className="px-3 py-2">Trang thai</th><th className="px-3 py-2">Thao tac</th></tr></thead>
            <tbody>
              {data.map((employee) => (
                <tr key={employee.id} className="border-t border-slate-100">
                  <td className="px-3 py-2">{employee.code}</td>
                  <td className="px-3 py-2">{employee.fullName}</td>
                  <td className="px-3 py-2">{employee.employeeType}</td>
                  <td className="px-3 py-2">{employee.phoneNumber || "-"}</td>
                  <td className="px-3 py-2">{employee.status}</td>
                  <td className="space-x-2 px-3 py-2"><Button className="px-3 py-1" onClick={() => router.push(`/employees/${employee.id}/edit`)}>Sua</Button><Button className="bg-red-600 px-3 py-1 hover:bg-red-700" onClick={() => onDelete(employee.id)}>Xoa</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
