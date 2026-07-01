import CropSheet from "@/components/crops/CropSheet";
import CropList from "@/components/crops/CropList";
import { Button } from "@/components/ui/button";

const CropsPage = () => {
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Crops
        </h1>

        <CropSheet
          mode="create"
          trigger={
            <Button>Add Crop</Button>
          }
        />
      </div>

      <CropList />
    </div>
  );
}

export default CropsPage