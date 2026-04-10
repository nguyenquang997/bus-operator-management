"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/context/toast-context";
import type { LoginRequest } from "@/types/auth";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const { showError, showSuccess } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginRequest>({
    defaultValues: { username: "", password: "" }
  });

  useEffect(() => {
    if (isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data);
      showSuccess("Dang nhap thanh cong");
      const redirect = searchParams.get("redirect") || "/dashboard";
      router.replace(redirect);
    } catch (error) {
      showError(error instanceof Error ? error.message : "Dang nhap that bai");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold">Dang nhap Admin</h1>
        <p className="mb-5 text-sm text-slate-500">Quan ly he thong nha xe</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <FormField label="Ten dang nhap" error={errors.username?.message}>
            <Input {...register("username", { required: "Bat buoc nhap ten dang nhap" })} />
          </FormField>

          <FormField label="Mat khau" error={errors.password?.message}>
            <Input type="password" {...register("password", { required: "Bat buoc nhap mat khau" })} />
          </FormField>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Dang dang nhap..." : "Dang nhap"}
          </Button>
        </form>
      </div>
    </div>
  );
}
