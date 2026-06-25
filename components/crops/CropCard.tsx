import { Crop } from "@/types/crop"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface CropCardProps {
    crop: Crop;
}

const CropCard = ({ crop }: CropCardProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    {crop.cropName}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
                <p>
                    <strong>Type:</strong>
                    {crop.cropType}
                </p>

                <p>
                    <strong>Area:</strong>
                    {crop.area} {crop.areaUnit}
                </p>

                <p>
                    <strong>Status:</strong>
                    {crop.status}
                </p>

                <p>
                    <strong>Planted:</strong>
                    {new Date(
                        crop.plantingDate
                    ).toLocaleDateString()}
                </p>

                <p>
                    <strong>Expected Harvest:</strong>
                    {new Date(
                        crop.expectedHarvestDate!
                    ).toLocaleDateString()}
                </p>
            </CardContent>
        </Card>
    )
}

export default CropCard
