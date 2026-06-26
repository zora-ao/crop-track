import CropForm from "@/components/forms/CropForm";

export default function NewCropPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">
                Add Crop
            </h1>

            <CropForm mode="create" />
        </div>
    );
}