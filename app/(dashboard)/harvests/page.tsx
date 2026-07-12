import HarvestDialog from "@/components/harvest/HarvestDialog";
import HarvestList from "@/components/harvest/HarvestList";

export default function HarvestsPage() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Harvest Records
          </h1>

          <p className="text-muted-foreground">
            Track harvested crops,
            yield, and revenue.
          </p>
        </div>

        <HarvestDialog />
      </div>

      <HarvestList />
    </div>
  );
}