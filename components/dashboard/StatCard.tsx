import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, CalendarDays, TrendingUp, CheckCircle2, HelpCircle } from "lucide-react";

interface StatCardProps {
    title: string;
    value: number;
}

// 1. Define a style configuration map matching your dashboard titles
const statConfig: Record<string, { icon: any; styles: string }> = {
    "Total Crops": {
        icon: Sprout,
        styles: "text-emerald-500 bg-emerald-500/10 border-emerald-500/10",
    },
    "Planned": {
        icon: CalendarDays,
        styles: "text-amber-500 bg-amber-500/10 border-amber-500/10",
    },
    "Growing": {
        icon: TrendingUp,
        styles: "text-blue-500 bg-blue-500/10 border-blue-500/10",
    },
    "Harvested": {
        icon: CheckCircle2,
        styles: "text-purple-500 bg-purple-500/10 border-purple-500/10",
    },
};

export default function StatCard({ title, value }: StatCardProps) {
  // 2. Fallback configuration if a title doesn't match perfectly
    const currentConfig = statConfig[title] || {
        icon: HelpCircle,
        styles: "text-muted-foreground bg-muted border-muted",
    };

    const Icon = currentConfig.icon;

    return (
        <Card className="border border-border/60 bg-card shadow-sm overflow-hidden">
        {/* 3. Align title text and icon container perfectly on the same line */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground tracking-tight">
            {title}
            </CardTitle>
            <div className={`p-2 rounded-xl border ${currentConfig.styles}`}>
            <Icon className="h-4 w-4" />
            </div>
        </CardHeader>

        <CardContent>
            {/* 4. Format numbers beautifully with local string grouping (e.g. 1,250 instead of 1250) */}
            <div className="text-2xl font-bold tracking-tight text-foreground">
            {value?.toLocaleString() ?? 0}
            </div>
        </CardContent>
        </Card>
    );
}