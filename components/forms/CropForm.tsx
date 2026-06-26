"use client"

import { CropInput, CropSchema } from "@/lib/validations/crop.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCrop } from "@/hooks/useCreateCrop";

type CropFormProps = {
    onSuccess?: () => void;
    defaultValues?: Partial<CropInput>;
    mode?: "create" | "edit";
    cropId?: string;
};

const CropForm = ({
    onSuccess,
    defaultValues,
    mode,
    cropId
}: CropFormProps) => {
    
    const queryClient = useQueryClient();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<CropInput>({
        resolver: zodResolver(CropSchema),

        defaultValues: {
            areaUnit: "sqm",
            ...defaultValues
        },
    });

    const createCropMutation = useCreateCrop(() => {
        reset();
        onSuccess?.();
    });

    const onSubmit: SubmitHandler<CropInput> = async(
        data
    ) => {

        if (mode === "create"){
            createCropMutation.mutate(data);
        }

        if (mode === "edit"){
            createCropMutation.mutate({
                id: cropId!,
                data,
            });
        }

    };

    return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 px-4"
        >
        <div>
            <Input
            placeholder="Crop Name"
            {...register("cropName")}
            />

            {errors.cropName && (
            <p className="text-red-500 text-sm">
                {errors.cropName.message}
            </p>
            )}
        </div>

        <div>
            <Input
            placeholder="Crop Type"
            {...register("cropType")}
            />

            {errors.cropType && (
            <p className="text-red-500 text-sm">
                {errors.cropType.message}
            </p>
            )}
        </div>

        <div>
            <label className="text-sm">
            Planting Date
            </label>

            <Input
            type="date"
            {...register("plantingDate")}
            />
        </div>

        <div>
            <label className="text-sm">
            Expected Harvest Date
            </label>

            <Input
            type="date"
            {...register(
                "expectedHarvestDate"
            )}
            />
        </div>

        <div>
            <Input
            type="number"
            placeholder="Area"
            {...register("area", { valueAsNumber: true })}
            />

            {errors.area && (
            <p className="text-red-500 text-sm">
                {errors.area.message}
            </p>
            )}
        </div>

        <div>
            <select
            {...register("areaUnit")}
            className="w-full border rounded-md p-2"
            >
            <option value="sqm">
                Square Meter
            </option>

            <option value="hectare">
                Hectare
            </option>

            <option value="acre">
                Acre
            </option>
            </select>
        </div>

        <div>
            <textarea
            {...register("notes")}
            placeholder="Notes"
            className="w-full border rounded-md p-2"
            />
        </div>

        <Button
            className="w-full"
            type="submit"
            disabled={isSubmitting}
        >
            {isSubmitting
            ? "Creating..."
            : "Create Crop"}
        </Button>
        </form>
    );
}

export default CropForm
