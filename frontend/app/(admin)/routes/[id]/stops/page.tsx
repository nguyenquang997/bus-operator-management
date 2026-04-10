"use client";

import { PageHeader } from "@/components/ui/page-header";
import { RouteStopManager } from "@/features/routes/route-stop-manager";

export default function RouteStopsPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <PageHeader title="Diem dung tuyen" description={`Quan ly diem dung cho tuyen ${params.id}`} />
      <RouteStopManager routeId={params.id} />
    </div>
  );
}
