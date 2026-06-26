import { CropInput } from "@/lib/validations/crop.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useCreateCrop = (
    onSuccessCallback?: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async(data: CropInput) => {
            const res = await fetch("/api/crops", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            if (!res.ok){
                throw new Error("Failed to create crop")
            }

            return res.json();
        },

        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["crops"]
            });

            toast.success("Crop Created Successfully");

            onSuccessCallback?.();
        },

        onError: () => {
            toast.error("Failed to create crop")
        }
    })
}