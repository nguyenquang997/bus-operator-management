"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { useToast } from "@/context/toast-context";
import { EmployeeForm } from "@/features/employees/employee-form";
import { useCreateEmployeeMutation } from "@/hooks/queries/use-employees-query";
import type { EmployeePayload } from "@/types/employee";

export default function NewEmployeePage() {
  const mutation = useCreateEmployeeMutation();
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const onSubmit = async (payload: EmployeePayload) => {
    try {
      await mutation.mutateAsync(payload);
      showSuccess("Da tao nhan vien");
      router.push("/employees");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Tao nhan vien that bai");
    }
  };

  return (
    <div>
      <PageHeader title="Tao moi nhan vien" />
      <EmployeeForm onSubmit={onSubmit} submitLabel="Tao moi" />
    </div>
  );
}
