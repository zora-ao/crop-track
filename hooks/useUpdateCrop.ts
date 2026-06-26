import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateCrop = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async({
            id,
            status,
        }: {
            id: string;
            status: string
        }) => {
            const res = await fetch(`/api/crops/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status,
                }),
            });

            return res.json();
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["crops"],
            });
        },
    });
}