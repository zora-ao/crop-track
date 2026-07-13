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
        <div className="min-h-screen bg-stone-50/50 p-4 sm:p-6 lg:p-8 space-y-5 text-stone-900 select-none">
            
            {/* Header Area */}
            <div className="flex flex-col gap-1 border-b border-stone-200 pb-4">
                <h1 className="text-xl font-bold tracking-tight text-stone-900 sm:text-2xl">
                    Dashboard
                </h1>
                <p className="text-xs text-stone-500">
                    Welcome back! Here is an overview of your farm metrics and conditions.
                </p>
            </div>

            {/* Main 4-Column Responsive Layout */}
            <div className="grid gap-5 grid-cols-1 lg:grid-cols-4 items-start">
                
                {/* Full-Width Stats Row */}
                <section aria-label="Overview Statistics" className="lg:col-span-4">
                    <DashboardStats />
                </section>

                {/* Left Side: Combined Weather Focus Stack (3/4 Screen Width) */}
                <div className="lg:col-span-3 flex flex-col gap-4">
                    
                    {/* Primary Focus: Weather Card (Generous padding/presence) */}
                    <div className="bg-white rounded-xl border border-stone-200/80 p-6 shadow-sm">
                        <WeatherCard />
                    </div>
                    
                    {/* Secondary Compact Support: Agricultural Recommendations */}
                    <div className="bg-white rounded-xl border border-stone-200/80 p-4 shadow-sm">
                        <WeatherRecommendations />
                    </div>

                </div>
                
                {/* Right Side: Farm Journal Sidebar (1/4 Screen Width) */}
                <div className="lg:col-span-1 bg-white rounded-xl border border-stone-200/80 p-4 shadow-sm flex flex-col">
                    {/* Integrated Action Header */}
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
                        <div>
                            <h3 className="text-xs font-semibold text-stone-900">Farm Journals</h3>
                            <p className="text-[10px] text-stone-400">Log regular updates</p>
                        </div>
                        <div className="shrink-0 scale-90 origin-right">
                            <JournalDialog />
                        </div>
                    </div>
                    
                    {/* The Clean Vertical List */}
                    <JournalList />
                </div>
                
            </div>
        </div>
    );
}

export default DashboardPage;