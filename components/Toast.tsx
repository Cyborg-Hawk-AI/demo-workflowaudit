"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
  type?: "success" | "info" | "warning";
}

export default function Toast({ message, onClose, type = "info" }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "border-emerald-500/40 bg-emerald-950/90 text-emerald-200",
    info: "border-brand-500/40 bg-brand-950/90 text-brand-200",
    warning: "border-amber-500/40 bg-amber-950/90 text-amber-200",
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] flex max-w-sm items-start gap-3 rounded-lg border px-4 py-3 shadow-2xl animate-slide-up ${colors[type]}`}
      role="status"
    >
      <span className="text-sm">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-auto shrink-0 opacity-60 hover:opacity-100"
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}
