import LocationSettings from "@/components/dashboard/LocationSearch";


export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        Farm Location
      </h1>

      <LocationSettings />
    </div>
  );
}