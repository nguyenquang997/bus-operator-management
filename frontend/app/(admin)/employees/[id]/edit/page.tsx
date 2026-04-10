"use client";

import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/ui/page-header";
import { ErrorState, LoadingState } from "@/components/ui/page-state";
import { useToast } from "@/context/toast-context";
import { EmployeeForm } from "@/features/employees/employee-form";
import { useEmployeeQuery, useUpdateEmployeeMutation } from "@/hooks/queries/use-employees-query";
import type { EmployeePayload } from "@/types/employee";

export default function EditEmployeePage({ params }: { params: { id: string } }) {
  const { data, isLoading, isError } = useEmployeeQuery(params.id);
  const mutation = useUpdateEmployeeMutation(params.id);
  const { showSuccess, showError } = useToast();
  const router = useRouter();

  const onSubmit = async (payload: EmployeePayload) => {
    try {
      await mutation.mutateAsync(payload);
      showSuccess("Da cap nhat nhan vien");
      router.push("/employees");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Cap nhat that bai");
    }
  };

  return (
    <div>
      <PageHeader title="Sua nhan vien" />
      {isLoading ? <LoadingState /> : null}
      {isError || !data ? <ErrorState message="Khong tai duoc nhan vien" /> : null}
      {data ? <EmployeeForm initialValues={{ branchId: data.branchId, code: data.code, fullName: data.fullName, phoneNumber: data.phoneNumber, employeeType: data.employeeType, licenseNumber: data.licenseNumber, licenseClass: data.licenseClass, hireDate: data.hireDate ? data.hireDate.slice(0, 10) : null, status: data.status, isActive: data.isActive }} onSubmit={onSubmit} submitLabel="Cap nhat" /> : null}
    </div>
  );
}
