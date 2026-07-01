import DashboardStats from "@/components/dashboard/DashboardStats";
import WeatherCard from "@/components/dashboard/WeatherCard";
import WeatherRecommendations from "@/components/dashboard/WeatherRecommendations";
import JournalDialog from "@/components/journal/JournalDialog";
import JournalList from "@/components/journal/JournalList";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

const DashboardPage = async () => {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        // 1. Give the page a subtle background, full height min-span, and unified padding
        <div className="min-h-screen bg-background border p-4 sm:p-6 lg:p-8 space-y-6">
            
            {/* 2. Header Area */}
            <div className="flex flex-col gap-1 border-b border-border/40 pb-4">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                    Welcome back! Here is an overview of your farm metrics and conditions.
                </p>
            </div>

            {/* 3. Stats Widget Section (Takes up the full width row automatically) */}
            <section aria-label="Overview Statistics">
                <DashboardStats />
            </section>

            {/* 4. Weather Intelligence Widgets Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
                
                {/* Weather Card takes 1 slot width on large screens */}
                <div className="lg:col-span-1">
                    <WeatherCard />
                </div>
                
                {/* Weather Recommendations takes 2 slots width on large screens to give it room */}
                <div className="lg:col-span-2">
                    <WeatherRecommendations />
                </div>

                <div>
                    <JournalDialog />
                    <JournalList />
                </div>
                
            </div>
            
        </div>
    );
}

export default DashboardPage;