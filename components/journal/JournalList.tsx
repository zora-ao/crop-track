"use client";

import { useJournals } from "@/hooks/journals/useJournals";
import JournalItem from "./JournalItem";
import { CardSkeleton } from "@/components/ui/loading-skeleton";
import { BookOpen } from "lucide-react";

export default function JournalList() {
    const { data: entries = [], isLoading } = useJournals();

    if (isLoading) {
        return (
            <div className="space-y-3">
                <CardSkeleton count={3} />
            </div>
        );
    }

    if (entries.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-200 bg-stone-50/50 p-12 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-stone-500">
                    <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-stone-900">No journal entries</h3>
                <p className="mt-1 text-sm text-stone-500 max-w-xs">
                    Start documenting your farm activities, weather logs, or notes to keep track of progress.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header Counter */}
            <div className="flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    Recent Entries ({entries.length})
                </span>
            </div>

            {/* Clean Vertical Stack */}
            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin">
                {entries.map((entry) => (
                    <JournalItem
                        key={entry._id}
                        entry={entry}
                    />
                ))}
            </div>
        </div>
    );
}