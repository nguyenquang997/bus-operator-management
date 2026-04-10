"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const menus = [
  { href: "/dashboard", label: "Tong quan" },
  { href: "/routes", label: "Tuyen xe" },
  { href: "/vehicles", label: "Xe" },
  { href: "/employees", label: "Nhan vien" },
  { href: "/trips", label: "Chuyen xe" },
  { href: "/reports/trips", label: "Bao cao" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white p-4">
      <h2 className="mb-6 text-lg font-semibold text-slate-900">Quan ly nha xe</h2>
      <nav className="space-y-1">
        {menus.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "block rounded-md px-3 py-2 text-sm",
                active ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-100"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
