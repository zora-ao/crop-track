import Link from "next/link";
import {
    LayoutDashboard,
    Sprout,
    Wallet,
    Wheat,
    Settings,
} from "lucide-react";

const Sidebar = () => {
    return (
    <aside className="w-64 border-r bg-background h-screen p-4">
        <h2 className="text-2xl font-bold mb-8">
            🌱 FarmTrack
        </h2>

        <nav className="space-y-2">
            <Link
            href="/dashboard"
            className="flex items-center gap-2 p-2 rounded hover:bg-muted"
            >
            <LayoutDashboard size={18} />
            Dashboard
            </Link>

            <Link
            href="/crops"
            className="flex items-center gap-2 p-2 rounded hover:bg-muted"
            >
            <Sprout size={18} />
            Crops
            </Link>

            <Link
            href="/expenses"
            className="flex items-center gap-2 p-2 rounded hover:bg-muted"
            >
            <Wallet size={18} />
            Expenses
            </Link>

            <Link
            href="/harvests"
            className="flex items-center gap-2 p-2 rounded hover:bg-muted"
            >
            <Wheat size={18} />
            Harvests
            </Link>

            <Link
            href="/settings"
            className="flex items-center gap-2 p-2 rounded hover:bg-muted"
            >
            <Settings size={18} />
            Settings
            </Link>
        </nav>
        </aside>
    );
}

export default Sidebar
