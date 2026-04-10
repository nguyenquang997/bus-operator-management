"use client";

import { PageHeader } from "@/components/ui/page-header";
import { EmptyState, ErrorState, LoadingState } from "@/components/ui/page-state";
import { useTripReportQuery } from "@/hooks/queries/use-report-query";
import { formatCurrency, formatDateTime } from "@/utils/format";

export default function TripReportPage() {
  const { data, isLoading, isError } = useTripReportQuery();

  return (
    <div>
      <PageHeader title="Bao cao chuyen" description="Bao cao doanh thu / chi phi theo chuyen" />
      {isLoading ? <LoadingState /> : null}
      {isError ? <ErrorState message="Khong tai duoc bao cao" /> : null}
      {data && data.length === 0 ? <EmptyState message="Chua co du lieu bao cao" /> : null}

      {data && data.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-left">
              <tr>
                <th className="px-3 py-2">Ma chuyen</th>
                <th className="px-3 py-2">Tuyen</th>
                <th className="px-3 py-2">Xe</th>
                <th className="px-3 py-2">Tai xe</th>
                <th className="px-3 py-2">Ngay chay</th>
                <th className="px-3 py-2">Trang thai</th>
                <th className="px-3 py-2">Doanh thu</th>
                <th className="px-3 py-2">Chi phi</th>
                <th className="px-3 py-2">Loi nhuan</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={`${row.tripId}-${row.departureDate}`} className="border-t border-slate-100">
                  <td className="px-3 py-2">{row.tripCode}</td>
                  <td className="px-3 py-2">{row.routeName}</td>
                  <td className="px-3 py-2">{row.vehiclePlateNumber}</td>
                  <td className="px-3 py-2">{row.driverName}</td>
                  <td className="px-3 py-2">{formatDateTime(row.departureDate)}</td>
                  <td className="px-3 py-2">{row.status}</td>
                  <td className="px-3 py-2">{formatCurrency(row.totalRevenue)}</td>
                  <td className="px-3 py-2">{formatCurrency(row.totalExpense)}</td>
                  <td className="px-3 py-2">{formatCurrency(row.profit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
