"use client";

import { Toaster } from "sonner";

export function SonnerToaster() {
  return (
    <Toaster
      position="bottom-right"
      richColors
      expand
      duration={3200}
      closeButton
      visibleToasts={5}
      toastOptions={{
        style: {
          width: "420px",
          maxWidth: "calc(100vw - 24px)",
          borderRadius: "12px"
        }
      }}
    />
  );
}
