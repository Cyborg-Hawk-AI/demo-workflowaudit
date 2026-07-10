"use client";

import { useState, useRef, useEffect } from "react";

interface DevNoteProps {
  title: string;
  children: React.ReactNode;
}

export default function DevNote({ title, children }: DevNoteProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-amber-500/40 bg-amber-500/10 text-[10px] font-bold text-amber-400 transition hover:bg-amber-500/20"
        aria-label={`DEV NOTE: ${title}`}
        title="DEV NOTE"
      >
        i
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 animate-fade-in rounded-lg border border-amber-500/30 bg-gray-900 p-3 shadow-xl">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-amber-400">
            DEV NOTE — {title}
          </p>
          <p className="text-xs leading-relaxed text-gray-300">{children}</p>
        </div>
      )}
    </div>
  );
}
