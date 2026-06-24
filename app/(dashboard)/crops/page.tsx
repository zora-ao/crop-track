import CropSheet from "@/components/crops/CropSheet";

export default function CropsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Crops
        </h1>

        <CropSheet />
      </div>

      <div>
        No crops yet.
      </div>
    </div>
  );
}