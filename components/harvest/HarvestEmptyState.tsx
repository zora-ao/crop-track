"use client";

import { Layers } from "lucide-react";

export function HarvestEmptyState() {
  return (
    <div className="text-center py-12 px-4">
      <Layers className="mx-auto h-8 w-8 text-zinc-400 mb-3" />
      <p className="text-sm font-medium text-zinc-900">No records found</p>
      <p className="text-xs text-zinc-500 mt-1">Get started by creating your first harvest entry.</p>
    </div>
  );
}
