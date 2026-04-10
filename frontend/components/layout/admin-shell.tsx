"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { isReady, isAuthenticated, user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isReady, isAuthenticated, router, pathname]);

  if (!isReady || !isAuthenticated) {
    return <div className="p-6 text-sm text-slate-600">Dang kiem tra dang nhap...</div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Bang quan tri</p>
            <p className="text-sm font-medium text-slate-900">{user?.fullName || user?.username}</p>
          </div>
          <Button className="bg-slate-700 hover:bg-slate-800" onClick={logout}>Dang xuat</Button>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
