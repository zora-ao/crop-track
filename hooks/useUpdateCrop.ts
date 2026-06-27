import { CropInput } from "@/lib/validations/crop.schema";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateCrop = (
    onSuccessCallback?: () => void
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async({
            id,
            data,
        }: {
            id: string;
            data: CropInput
        }) => {
            const res = await fetch(`/api/crops/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            });

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["crops"],
            });

            onSuccessCallback?.();
        },
    });
}