"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { useToast } from "@/context/toast-context";
import { RouteForm } from "@/features/routes/route-form";
import { useCreateRouteMutation } from "@/hooks/queries/use-routes-query";
import type { RoutePayload } from "@/types/route";

export default function NewRoutePage() {
  const mutation = useCreateRouteMutation();
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const onSubmit = async (payload: RoutePayload) => {
    try {
      await mutation.mutateAsync(payload);
      showSuccess("Da tao tuyen");
      router.push("/routes");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Tao tuyen that bai");
    }
  };

  return (
    <div>
      <PageHeader title="Tao moi tuyen" description="Them tuyen moi" />
      <RouteForm onSubmit={onSubmit} submitLabel="Tao moi" />
    </div>
  );
}
