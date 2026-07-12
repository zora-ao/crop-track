"use client";

import { Download } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import HarvestDialog from "./HarvestDialog";
import { useHarvest } from "@/hooks/harvest/useHarvest";
import DeleteHarvestDialog from "./DeleteHarvestDialog";
import { HarvestEmptyState } from "./HarvestEmptyState";
import { HarvestTable } from "./HarvestTable";
import { HarvestMobileCards } from "./HarvestMobileCards";
import { type HarvestRecord, formatShortDate, getCropName } from "@/lib/harvest-utils";

export default function HarvestList() {
  const { data = [], isLoading } = useHarvest();
  const [selectedHarvest, setSelectedHarvest] = useState<HarvestRecord | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (isLoading) {
    return (
      <Card className="w-full shadow-sm border-zinc-200">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight text-zinc-900">Harvest Records</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <p className="text-sm text-zinc-500 animate-pulse">Loading records...</p>
        </CardContent>
      </Card>
    );
  }

  const harvests = (data ?? []) as HarvestRecord[];

  const handleEdit = (harvest: HarvestRecord) => {
    setSelectedHarvest(harvest);
    setEditOpen(true);
  };

  const handleDelete = (harvest: HarvestRecord) => {
    setSelectedHarvest(harvest);
    setDeleteOpen(true);
  };

  const exportToCsv = () => {
    const rows = [
      ["Crop Name", "Quantity", "Unit", "Unit Price", "Total Revenue", "Harvest Date", "Notes"],
      ...harvests.map((harvest) => [
        getCropName(harvest),
        harvest.quantity ?? 0,
        harvest.unit ?? "",
        harvest.sellingPrice ?? 0,
        harvest.totalRevenue ?? 0,
        formatShortDate(harvest.harvestDate),
        harvest.notes ?? "",
      ]),
    ];

    const csvContent = rows
      .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "harvest-records.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Card className="w-full shadow-sm border-zinc-200 overflow-hidden">
        <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <CardTitle className="text-xl font-semibold tracking-tight text-zinc-900">
                Harvest Records
              </CardTitle>
              <CardDescription className="text-zinc-500 mt-1">
                Manage your crop yields, pricing distributions, and historical revenue tracking.
              </CardDescription>
            </div>
            <Button onClick={exportToCsv} variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {harvests.length === 0 ? (
            <HarvestEmptyState />
          ) : (
            <>
              <HarvestTable harvests={harvests} onEdit={handleEdit} onDelete={handleDelete} />
              <HarvestMobileCards harvests={harvests} onEdit={handleEdit} onDelete={handleDelete} />
            </>
          )}
        </CardContent>
      </Card>

      {/* Dialog Triggers */}
      {selectedHarvest && (
        <>
          <HarvestDialog
            mode="edit"
            harvest={selectedHarvest}
            open={editOpen}
            onOpenChange={setEditOpen}
          />
          <DeleteHarvestDialog
            harvestId={selectedHarvest._id}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
          />
        </>
      )}
    </>
  );
}