"use client";

import { toast } from "sonner";

type ToastOptions = Parameters<typeof toast.success>[1];

const variantStyles = {
  success: { background: "#059669", color: "#ffffff", border: "1px solid #047857" },
  error: { background: "#dc2626", color: "#ffffff", border: "1px solid #b91c1c" },
  warning: { background: "#d97706", color: "#ffffff", border: "1px solid #b45309" },
  info: { background: "#2563eb", color: "#ffffff", border: "1px solid #1d4ed8" }
} as const;

function mergeOptions(type: keyof typeof variantStyles, options?: ToastOptions): ToastOptions {
  return {
    ...options,
    style: {
      ...variantStyles[type],
      ...(options?.style || {})
    }
  };
}

export function useToast() {
  return {
    showSuccess: (message: string, options?: ToastOptions) => toast.success(message, mergeOptions("success", options)),
    showError: (message: string, options?: ToastOptions) => toast.error(message, mergeOptions("error", options)),
    showWarning: (message: string, options?: ToastOptions) => toast.warning(message, mergeOptions("warning", options)),
    showInfo: (message: string, options?: ToastOptions) => toast.info(message, mergeOptions("info", options))
  };
}
