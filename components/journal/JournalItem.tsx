"use client";

import { useState } from "react";
import { Calendar, MoreVertical } from "lucide-react";

import { Journal } from "@/types/journal";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import JournalDialog from "./JournalDialog";
import DeleteJournalDialog from "./DeleteJournalDialog";

type JournalItemProps = {
    entry: Journal;
};

export default function JournalItem({
    entry,
}: JournalItemProps) {
    const [editOpen, setEditOpen] = useState(false);

    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
        <div className="group py-3.5 first:pt-0 last:pb-0">
            <div className="flex flex-col gap-1">
            <div className="flex items-start justify-between gap-4">
                <div>
                <h4 className="font-medium text-sm">
                    {entry.title}
                </h4>

                <p className="text-sm text-muted-foreground line-clamp-2">
                    {entry.content}
                </p>
                </div>

                <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />

                    {new Date(
                    entry.createdAt
                    ).toLocaleDateString()}
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <button>
                        <MoreVertical className="h-4 w-4" />
                    </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() =>
                        setEditOpen(true)
                        }
                    >
                        Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-red-500"
                        onClick={() =>
                        setDeleteOpen(true)
                        }
                    >
                        Delete
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>
            </div>
        </div>

        <JournalDialog
            mode="edit"
            journal={entry}
            open={editOpen}
            onOpenChange={setEditOpen}
        />

        <DeleteJournalDialog
            journalId={entry._id}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
        />
        </>
    );
}