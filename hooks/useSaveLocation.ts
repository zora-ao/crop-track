import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSaveLocation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            latitude,
            longitude,
            address,
        }: {
            latitude: number;
            longitude: number;
            address: string;
        }) => {
        const res = await fetch("/api/location", {
                method: "PATCH",
                headers: {
                "Content-Type": "application/json",
            },
                body: JSON.stringify({
                latitude,
                longitude,
                address,
            }),
        });

        if (!res.ok) {
            throw new Error("Failed to save location");
        }

        return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["weather"],
            });

            toast.success("Location saved");
        },

        onError: () => {
            toast.error("Failed to save location");
        },
    });
};