"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useCreateJournal } from "@/hooks/journals/useCreateJournal";
import { useUpdateJournal } from "@/hooks/journals/useUpdateJournal";

type Journal = {
  _id: string;
  title: string;
  content: string;
};

type JournalDialogProps = {
  mode?: "create" | "edit";
  journal?: Journal;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function JournalDialog({
  mode = "create",
  journal,
  open: controlledOpen,
  onOpenChange,
}: JournalDialogProps) {
  const [internalOpen, setInternalOpen] =
    useState(false);

  const open =
    controlledOpen ?? internalOpen;

  const setOpen =
    onOpenChange ?? setInternalOpen;

  const [title, setTitle] =
    useState("");

  const [content, setContent] =
    useState("");

  useEffect(() => {
    if (mode === "edit" && journal) {
      setTitle(journal.title);
      setContent(journal.content);
    }

    if (mode === "create" && open) {
      setTitle("");
      setContent("");
    }
  }, [journal, mode, open]);

  const createJournal =
    useCreateJournal(() => {
      setOpen(false);
      setTitle("");
      setContent("");
    });

  const updateJournal =
    useUpdateJournal(() => {
      setOpen(false);
    });

  const handleSubmit = () => {
    if (!title.trim()) return;

    if (mode === "edit" && journal) {
      updateJournal.mutate({
        id: journal._id,
        data: {
          title,
          content,
        },
      });

      return;
    }

    createJournal.mutate({
      title,
      content,
    });
  };

  return (
    <>
      {mode === "create" && (
        <Button
          onClick={() =>
            setOpen(true)
          }
        >
          Add Journal
        </Button>
      )}

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === "create"
                ? "New Journal Entry"
                : "Edit Journal Entry"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <textarea
              value={content}
              onChange={(e) =>
                setContent(
                  e.target.value
                )
              }
              className="w-full border rounded-md p-2"
              rows={4}
              placeholder="Write your notes..."
            />

            <Button
              className="w-full"
              onClick={handleSubmit}
              disabled={
                createJournal.isPending ||
                updateJournal.isPending
              }
            >
              {createJournal.isPending ||
              updateJournal.isPending
                ? mode === "create"
                  ? "Saving..."
                  : "Updating..."
                : mode === "create"
                ? "Save Entry"
                : "Update Entry"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}