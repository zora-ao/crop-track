import { Crop } from "@/types/crop";
import { Harvest } from "@/types/harvest";

export type HarvestRecord = Harvest & { cropId?: string | Partial<Crop> };

export function getCropName(h: HarvestRecord) {
  const cropId = h.cropId;
  if (!cropId || typeof cropId === "string") return "Unknown Crop";
  return (cropId as Partial<Crop>).cropName ?? "Unknown Crop";
}

export function formatDate(date?: string) {
  return date
    ? new Date(date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";
}

export function formatShortDate(date?: string) {
  return date ? new Date(date).toLocaleDateString() : "-";
}
