"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ErrorState, LoadingState } from "@/components/ui/page-state";
import { useDashboardSummaryQuery } from "@/hooks/queries/use-dashboard-query";
import { formatCurrency, formatNumber } from "@/utils/format";

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboardSummaryQuery();

  return (
    <div>
      <PageHeader title="Tong quan" description="Tinh hinh van hanh" />
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState message="Khong tai duoc du lieu tong quan" /> : null}
      {data ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard title="Tong chuyen" value={formatNumber(data.totalTrips)} />
          <SummaryCard title="Tong doanh thu" value={formatCurrency(data.totalRevenue || 0)} />
          <SummaryCard title="Tong chi phi" value={formatCurrency(data.totalExpense || 0)} />
          <SummaryCard title="Loi nhuan" value={formatCurrency(data.profit || 0)} />
        </div>
      ) : null}
    </div>
  );
}

function SummaryCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
