"use client";

import { Calendar, FileText } from "lucide-react";

import { HarvestActionsMenu } from "./HarvestActionsMenu";
import { formatShortDate, getCropName, type HarvestRecord } from "@/lib/harvest-utils";

interface HarvestMobileCardsProps {
  harvests: HarvestRecord[];
  onEdit: (harvest: HarvestRecord) => void;
  onDelete: (harvest: HarvestRecord) => void;
}

export function HarvestMobileCards({ harvests, onEdit, onDelete }: HarvestMobileCardsProps) {
  return (
    <div className="block md:hidden divide-y divide-zinc-100">
      {harvests.map((harvest) => (
        <div key={harvest._id} className="p-4 bg-white hover:bg-zinc-50/30 transition-colors">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="inline-flex items-center rounded-md bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 mb-1">
                {getCropName(harvest)}
              </span>
              <div className="flex items-baseline gap-1 text-sm font-semibold text-zinc-900">
                {(harvest.quantity ?? 0).toLocaleString()}
                <span className="text-xs font-normal text-zinc-500">{harvest.unit}</span>
              </div>
            </div>
            <HarvestActionsMenu
              onEdit={() => onEdit(harvest)}
              onDelete={() => onDelete(harvest)}
            />
          </div>

          <div className="grid grid-cols-2 gap-y-2 gap-x-4 rounded-lg bg-zinc-50 p-2.5 text-xs">
            <div>
              <span className="text-zinc-400 block mb-0.5">Price per unit</span>
              <span className="font-mono font-medium text-zinc-700">₱{(harvest.sellingPrice ?? 0).toLocaleString()}</span>
            </div>
            <div>
              <span className="text-zinc-400 block mb-0.5">Total Revenue</span>
              <span className="font-mono font-bold text-emerald-600">₱{(harvest.totalRevenue ?? 0).toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 text-xs text-zinc-400">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatShortDate(harvest.harvestDate)}</span>
            </div>
            {harvest.notes && (
              <div className="flex items-center gap-1 max-w-[50%] text-right truncate">
                <FileText className="h-3 w-3 shrink-0" />
                <span className="truncate" title={harvest.notes}>{harvest.notes}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
