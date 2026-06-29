import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSaveLocation } from "./useSaveLocation";

export const useLocation = () => {
    const saveLocationMutation = useSaveLocation();

    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(
        async (position) => {
            saveLocationMutation.mutate({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    address: "Current Location",
                });
            },

            (error) => {
                console.error(error);

                toast.error(
                    "Location permission denied"
                );
            }
        );
    };

    return {
        getCurrentLocation,
    };
};