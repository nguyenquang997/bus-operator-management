"use client";

import { PageHeader } from "@/components/ui/page-header";
import { ErrorState } from "@/components/ui/page-state";
import { useToast } from "@/context/toast-context";
import { UserForm } from "@/features/users/user-form";
import { useCreateUserMutation } from "@/hooks/queries/use-users-query";
import { useAuth } from "@/context/auth-context";
import type { UserPayload } from "@/types/user";

export default function NewUserPage() {
  const mutation = useCreateUserMutation();
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const isAdmin = user?.roles?.includes("ADMIN");

  const onSubmit = async (payload: UserPayload) => {
    try {
      await mutation.mutateAsync(payload);
      showSuccess("Da tao user");
    } catch (error) {
      showError(error instanceof Error ? error.message : "Tao user that bai");
    }
  };

  if (!isAdmin) {
    return <ErrorState message="Ban khong co quyen truy cap chuc nang nay" />;
  }

  return (
    <div>
      <PageHeader title="Tao moi user" description="Tao tai khoan dang nhap cho he thong" />
      <UserForm onSubmit={onSubmit} submitLabel="Tao moi" />
    </div>
  );
}
