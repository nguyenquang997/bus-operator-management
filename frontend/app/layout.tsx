import type { Metadata } from "next";
import "@/app/globals.css";
import "sonner/dist/styles.css";
import { AppProviders } from "@/providers/app-providers";
import { SonnerToaster } from "@/components/ui/sonner-toaster";

export const metadata: Metadata = {
  title: "Bus Operator Admin",
  description: "Admin dashboard for bus operator management"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <AppProviders>{children}</AppProviders>
        <SonnerToaster />
      </body>
    </html>
  );
}
