"use client";

import { Calendar, MoreVertical } from "lucide-react";

import {
Card,
CardContent,
CardHeader,
CardTitle,
CardDescription,
} from "@/components/ui/card";

import {
DropdownMenu,
DropdownMenuContent,
DropdownMenuItem,
DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { useState } from "react";


import HarvestDialog from "./HarvestDialog";
import { useHarvest } from "@/hooks/harvest/useHarvest";
import DeleteHarvestDialog from "./DeleteHarvestDialog";

export default function HarvestList() {
const {
data = [],
isLoading,
} = useHarvest();

const [selectedHarvest, setSelectedHarvest] =
useState<any>(null);

const [editOpen, setEditOpen] =
useState(false);

const [deleteOpen, setDeleteOpen] =
useState(false);

if (isLoading) {
return ( <Card> <CardHeader> <CardTitle>
Harvest Records </CardTitle> </CardHeader>

    <CardContent>
      <p>Loading harvests...</p>
    </CardContent>
  </Card>
);

}

return (
<> <Card> <CardHeader> <CardTitle>
Harvest Records </CardTitle>

      <CardDescription>
        Track harvested crops and
        generated revenue.
      </CardDescription>
    </CardHeader>

    <CardContent>
      {data.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No harvest records yet.
        </p>
      ) : (
        <div className="space-y-4">

          {data.map((harvest) => (
            <div
              key={harvest._id}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between items-start">

                <div>
                  <h4 className="font-medium">
                    {harvest.cropId?.cropName ??
                      "Unknown Crop"}
                  </h4>

                  <p className="text-sm text-muted-foreground">
                    {harvest.quantity}
                    {" "}
                    {harvest.unit}
                  </p>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end">

                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedHarvest(
                          harvest
                        );

                        setEditOpen(
                          true
                        );
                      }}
                    >
                      Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="text-red-500"
                      onClick={() => {
                        setSelectedHarvest(
                          harvest
                        );

                        setDeleteOpen(
                          true
                        );
                      }}
                    >
                      Delete
                    </DropdownMenuItem>

                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-3 space-y-1">

                <p className="text-sm">
                  Price:
                  {" "}
                  ₱
                  {harvest.sellingPrice.toLocaleString()}
                  /
                  {harvest.unit}
                </p>

                <p className="font-semibold text-green-600">
                  Revenue:
                  {" "}
                  ₱
                  {harvest.totalRevenue.toLocaleString()}
                </p>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />

                  {new Date(
                    harvest.harvestDate
                  ).toLocaleDateString()}
                </div>

                {harvest.notes && (
                  <p className="text-sm mt-2">
                    {harvest.notes}
                  </p>
                )}

              </div>
            </div>
          ))}

        </div>
      )}
    </CardContent>
  </Card>

  {selectedHarvest && (
    <>
      <HarvestDialog
        mode="edit"
        harvest={selectedHarvest}
        open={editOpen}
        onOpenChange={
          setEditOpen
        }
      />

      <DeleteHarvestDialog
        harvestId={
          selectedHarvest._id
        }
        open={deleteOpen}
        onOpenChange={
          setDeleteOpen
        }
      />
    </>
  )}
</>
);
}
