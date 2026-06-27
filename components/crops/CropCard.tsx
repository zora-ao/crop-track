"use client";

import { Crop } from "@/types/crop";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import CropSheet from "./CropSheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreVertical, Calendar, MapPin, Sprout, Leaf, Clock, BadgeCheck } from "lucide-react";
import DeleteCropDialog from "./DeleteCropDialog";

interface CropCardProps {
    crop: Crop;
}

// Refined nature-inspired status colors with better contrast
const statusColors = {
    planned: "bg-sky-50 text-sky-700 border-sky-200",
    planted: "bg-amber-50 text-amber-700 border-amber-200",
    growing: "bg-emerald-50 text-emerald-700 border-emerald-200",
    harvested: "bg-green-100 text-green-700 border-green-200",
};

// Status icons
const statusIcons = {
    planned: Clock,
    planted: Sprout,
    growing: Leaf,
    harvested: BadgeCheck,
};

const daysUntilHarvest = (harvestDate?: string) => {
    if (!harvestDate) return null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const harvest = new Date(harvestDate);
    harvest.setHours(0, 0, 0, 0);
    const diff = harvest.getTime() - today.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(undefined, { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
};

const CropCard = ({ crop }: CropCardProps) => {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const harvestDays = daysUntilHarvest(crop.expectedHarvestDate);
    const StatusIcon = statusIcons[crop.status];

    // Determine harvest urgency
    const getHarvestStatus = () => {
        if (crop.status === "harvested") return null;
        if (harvestDays === null) return null;
        if (harvestDays <= 0) return { label: "Ready to Harvest", className: "bg-rose-50 text-rose-700 border-rose-200" };
        if (harvestDays <= 7) return { label: `${harvestDays} days remaining`, className: "bg-amber-50 text-amber-700 border-amber-200" };
        if (harvestDays <= 14) return { label: `${harvestDays} days remaining`, className: "bg-emerald-50 text-emerald-700 border-emerald-200" };
        return { label: `${harvestDays} days remaining`, className: "bg-stone-50 text-stone-600 border-stone-200" };
    };

    const harvestInfo = getHarvestStatus();

    return (
        <>
            <Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                {/* Nature-inspired gradient border */}
                <div className="absolute inset-0 rounded-lg border border-stone-200/80 pointer-events-none" />
                
                {/* Decorative top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-emerald-500 to-emerald-400 opacity-80" />
                
                {/* Subtle background texture */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-50/30 via-transparent to-transparent pointer-events-none" />

                <CardHeader className="relative flex flex-row items-start justify-between space-y-0 pt-5 pb-2 px-5">
                    <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                            <CardTitle className="text-lg font-semibold text-stone-800 tracking-tight">
                                {crop.cropName}
                            </CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                                <Sprout className="h-3 w-3" />
                                {crop.cropType}
                            </span>
                            <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${statusColors[crop.status]}`}>
                                <StatusIcon className="h-3 w-3" />
                                {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}
                            </span>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
                                aria-label={`Options for ${crop.cropName}`}
                            >
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-36">
                            <DropdownMenuItem onClick={() => setEditOpen(true)} className="cursor-pointer">
                                Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 cursor-pointer"
                                onClick={() => setDeleteOpen(true)}
                            >
                                Delete Crop
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </CardHeader>

                <CardContent className="relative space-y-4 pt-0 px-5 pb-5 text-stone-600">
                    {/* Area and harvest info row */}
                    <div className="flex items-center justify-between gap-4 bg-stone-50/70 rounded-lg px-3 py-2 border border-stone-100">
                        <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-stone-400" />
                            <span className="font-medium text-stone-700">
                                {crop.area} {crop.areaUnit}
                            </span>
                        </div>
                        
                        {/* Harvest countdown pill */}
                        {harvestInfo && (
                            <div className={`flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-medium border ${harvestInfo.className}`}>
                                <Clock className="h-3 w-3" />
                                {harvestInfo.label}
                            </div>
                        )}
                    </div>

                    {/* Date grid with icons */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white rounded-lg px-3 py-2.5 border border-stone-100">
                            <div className="flex items-center gap-2 text-stone-400 text-xs font-medium mb-1">
                                <Calendar className="h-3.5 w-3.5" />
                                Planted
                            </div>
                            <p className="text-sm font-medium text-stone-700">
                                {formatDate(crop.plantingDate)}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg px-3 py-2.5 border border-stone-100">
                            <div className="flex items-center gap-2 text-stone-400 text-xs font-medium mb-1">
                                <Calendar className="h-3.5 w-3.5" />
                                Harvest
                            </div>
                            <p className="text-sm font-medium text-stone-700">
                                {crop.expectedHarvestDate 
                                    ? formatDate(crop.expectedHarvestDate)
                                    : "Not set"}
                            </p>
                        </div>
                    </div>

                    {/* Notes with improved styling */}
                    {crop.notes && (
                        <div className="bg-stone-50/70 rounded-lg px-3 py-2.5 border border-stone-100">
                            <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">
                                {crop.notes}
                            </p>
                        </div>
                    )}

                    {/* Interactive Modals */}
                    <CropSheet
                        mode="edit"
                        crop={crop}
                        open={editOpen}
                        onOpenChange={setEditOpen}
                    />

                    <DeleteCropDialog
                        cropId={crop._id}
                        open={deleteOpen}
                        onOpenChange={setDeleteOpen}
                    />
                </CardContent>
            </Card>
        </>
    );
};

export default CropCard;