"use client";

import { Calendar, MoreVertical } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useJournals } from "@/hooks/journals/useJournals";
import { Journal } from "@/types/journal";
import { useState } from "react";
import JournalItem from "./JournalItem";

type JournalItemProps = {
  entry: Journal;
};

export default function JournalList(
  {entry}: JournalItemProps
) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const { data = [], isLoading } = useJournals();

  // Updated skeleton to match the new side-by-side header layout
  if (isLoading) {
    return (
      <Card className="shadow-sm">
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2 border-b pb-4 last:border-0 last:pb-0">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="divide-y divide-border">
      {data.map((entry) => (
        <JournalItem
          key={entry._id}
          entry={entry}
        />
      ))}
    </div>
  );
}