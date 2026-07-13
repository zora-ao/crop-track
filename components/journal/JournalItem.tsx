"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Journal } from "@/types/journal";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import JournalDialog from "./JournalDialog";
import DeleteJournalDialog from "./DeleteJournalDialog";

type JournalItemProps = {
    entry: Journal;
};

export default function JournalItem({ entry }: JournalItemProps) {
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Prevent clicking the dropdown from triggering the main card's view modal
    const handleActionClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <>
            {/* Clickable Note Card */}
            <div 
                onClick={() => setViewOpen(true)}
                className="group cursor-pointer rounded-xl border border-stone-100 bg-stone-50/40 p-3 transition-all duration-150 hover:bg-stone-100/70 hover:border-stone-200/60 shadow-sm hover:shadow-md"
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 space-y-1">
                        <h4 className="font-semibold text-stone-900 text-sm truncate">
                            {entry.title || "Untitled Entry"}
                        </h4>
                        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                            {entry.content}
                        </p>
                    </div>

                    {/* Action Button Container */}
                    <div 
                        onClick={handleActionClick}
                        className="shrink-0 md:opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100"
                    >
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-500 hover:text-stone-800 shadow-sm transition-colors">
                                    <MoreVertical className="h-3.5 w-3.5" />
                                </button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-32">
                                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                                    Edit note
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                    onClick={() => setDeleteOpen(true)}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

            {/* 1. Full-Screen Reading Modal */}
            <Dialog open={viewOpen} onOpenChange={setViewOpen}>
                <DialogContent className="sm:max-w-xl bg-white border border-stone-200 rounded-2xl shadow-xl p-6 text-stone-900">
                    <DialogHeader className="border-b border-stone-100 pb-4 mb-4">
                        <DialogTitle className="text-lg font-bold text-stone-900 tracking-tight">
                            {entry.title || "Untitled Entry"}
                        </DialogTitle>
                        <DialogDescription className="text-[11px] text-stone-400 font-medium uppercase tracking-wider mt-1">
                            Reading Mode
                        </DialogDescription>
                    </DialogHeader>
                    
                    {/* Max height setup with scrollbars for exceptionally long essays */}
                    <div className="max-h-[60vh] overflow-y-auto text-sm text-stone-700 leading-relaxed whitespace-pre-wrap pr-2">
                        {entry.content}
                    </div>
                </DialogContent>
            </Dialog>

            {/* 2. Edit Modal Trigger */}
            <JournalDialog
                mode="edit"
                journal={entry}
                open={editOpen}
                onOpenChange={setEditOpen}
            />

            {/* 3. Delete Confirmation Trigger */}
            <DeleteJournalDialog
                journalId={entry._id}
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
            />
        </>
    );
}