import { forwardRef, InputHTMLAttributes, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";

interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  value?: number | null;
  onValueChange?: (value: number | undefined) => void;
  allowDecimal?: boolean;
}

function addGrouping(intPart: string): string {
  if (!intPart) return "";
  return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function toDisplay(value: number | null | undefined, allowDecimal: boolean): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "";
  if (allowDecimal) {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 6 }).format(value);
  }
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function normalizeRaw(raw: string, allowDecimal: boolean): { display: string; numeric?: number } {
  const cleaned = raw.replace(/,/g, "");
  const hasDot = allowDecimal && cleaned.includes(".");
  const [left, ...rest] = cleaned.split(".");
  const intPart = left.replace(/\D/g, "");
  const decPart = allowDecimal ? rest.join("").replace(/\D/g, "") : "";

  if (!intPart && !decPart) {
    return { display: "" };
  }

  const grouped = addGrouping(intPart || "0");
  const display = hasDot ? `${grouped}.${decPart}` : grouped;
  const numericText = hasDot ? `${intPart || "0"}.${decPart}` : intPart || "0";
  const numeric = Number(numericText);

  return { display, numeric: Number.isNaN(numeric) ? undefined : numeric };
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
  { value, onValueChange, allowDecimal = false, onBlur, ...props },
  ref
) {
  const externalValue = useMemo(() => toDisplay(value, allowDecimal), [value, allowDecimal]);
  const [display, setDisplay] = useState(externalValue);

  useEffect(() => {
    setDisplay(externalValue);
  }, [externalValue]);

  return (
    <Input
      {...props}
      ref={ref}
      inputMode={allowDecimal ? "decimal" : "numeric"}
      value={display}
      onChange={(e) => {
        const { display: nextDisplay, numeric } = normalizeRaw(e.target.value, allowDecimal);
        setDisplay(nextDisplay);
        onValueChange?.(numeric);
      }}
      onBlur={(e) => {
        setDisplay(toDisplay(value, allowDecimal));
        onBlur?.(e);
      }}
    />
  );
});
