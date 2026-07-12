"use client";

import { Calendar, FileText } from "lucide-react";

import { HarvestActionsMenu } from "./HarvestActionsMenu";
import { formatDate, getCropName, type HarvestRecord } from "@/lib/harvest-utils";

interface HarvestTableProps {
  harvests: HarvestRecord[];
  onEdit: (harvest: HarvestRecord) => void;
  onDelete: (harvest: HarvestRecord) => void;
}

export function HarvestTable({ harvests, onEdit, onDelete }: HarvestTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-100 bg-zinc-50/70 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <th className="py-3.5 px-6">Crop Name</th>
            <th className="py-3.5 px-4">Yield / Quantity</th>
            <th className="py-3.5 px-4">Unit Price</th>
            <th className="py-3.5 px-4">Total Revenue</th>
            <th className="py-3.5 px-4">Harvest Date</th>
            <th className="py-3.5 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 text-sm text-zinc-700">
          {harvests.map((harvest) => (
            <tr key={harvest._id} className="hover:bg-zinc-50/50 transition-colors group">
              <td className="py-4 px-6 font-medium text-zinc-900">
                <div>
                  <span>{getCropName(harvest)}</span>
                  {harvest.notes && (
                    <p className="text-xs text-zinc-400 font-normal mt-0.5 max-w-50 truncate" title={harvest.notes}>
                      {harvest.notes}
                    </p>
                  )}
                </div>
              </td>
              <td className="py-4 px-4 text-zinc-600">
                {(harvest.quantity ?? 0).toLocaleString()} <span className="text-xs text-zinc-400">{harvest.unit}</span>
              </td>
              <td className="py-4 px-4 font-mono text-xs text-zinc-600">
                ₱{(harvest.sellingPrice ?? 0).toLocaleString()}/{harvest.unit}
              </td>
              <td className="py-4 px-4 font-semibold font-mono text-emerald-600">
                ₱{(harvest.totalRevenue ?? 0).toLocaleString()}
              </td>
              <td className="py-4 px-4 text-zinc-500 text-xs">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                  {formatDate(harvest.harvestDate)}
                </div>
              </td>
              <td className="py-4 px-6 text-right">
                <HarvestActionsMenu
                  onEdit={() => onEdit(harvest)}
                  onDelete={() => onDelete(harvest)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
