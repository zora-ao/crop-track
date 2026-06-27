"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Sprout,
    Wallet,
    Wheat,
    Settings,
} from "lucide-react";

const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/crops", label: "Crops", icon: Sprout },
        { href: "/expenses", label: "Expenses", icon: Wallet },
        { href: "/harvests", label: "Harvests", icon: Wheat },
        { href: "/settings", label: "Settings", icon: Settings },
    ];

    return (
        <>
            <div className="hidden md:flex flex-col w-64 h-full p-5 bg-white text-stone-800">
                <div className="flex items-center gap-2 mb-8 px-2">
                    <span className="text-2xl">🌱</span>
                    <h2 className="text-xl font-bold tracking-tight text-stone-900">
                        Farm<span className="text-emerald-700">Track</span>
                    </h2>
                </div>

                <nav className="space-y-1.5 flex-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? "bg-emerald-50 text-emerald-800 shadow-sm border border-emerald-100/50"
                                        : "text-stone-600 hover:bg-stone-100/80 hover:text-stone-900"
                                }`}
                            >
                                <Icon className={`h-4.5 w-4.5 ${isActive ? "text-emerald-700" : "text-stone-400"}`} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[85%] max-w-sm">
                <nav className="flex flex-row items-center justify-between bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl border border-stone-200/60">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                title={item.label}
                                className={`flex items-center justify-center p-2.5 rounded-full transition-all duration-200 relative ${
                                    isActive 
                                        ? "bg-emerald-50 text-emerald-700 scale-110 shadow-sm border border-emerald-100/30" 
                                        : "text-stone-500 hover:text-stone-800"
                                }`}
                            >
                                <Icon className="h-5 w-5" />
                                {isActive && (
                                    <span className="absolute -bottom-1 h-1 w-1 bg-emerald-600 rounded-full" />
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;