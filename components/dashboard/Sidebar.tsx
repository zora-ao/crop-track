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
import LogoutButton from "./LogoutButton";

interface SidebarProps {
    name?: string;
}

const Sidebar = ({ name }: SidebarProps) => {
    const pathname = usePathname();

    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/crops", label: "Crops", icon: Sprout },
        { href: "/expenses", label: "Expenses", icon: Wallet },
        { href: "/harvests", label: "Harvests", icon: Wheat },
        { href: "/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="flex flex-col w-64 h-full bg-stone-50 border-r md:border-r-stone-200/80 text-stone-700 select-none shrink-0">
            {/* Header / Brand */}
            <div className="h-16 flex items-center px-6 border-b border-stone-200/60 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm shadow-emerald-600/20 shrink-0">
                        <Sprout className="h-4.5 w-4.5" />
                    </div>
                    <h2 className="text-sm font-semibold tracking-tight text-stone-900">
                        Farm<span className="text-emerald-600">Track</span>
                    </h2>
                </div>
            </div>

            {/* Navigation Links List */}
            <div className="flex-1 px-4 py-6 overflow-y-auto">
                <nav className="space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                                    isActive
                                        ? "bg-white text-emerald-700 shadow-sm border border-stone-200/50"
                                        : "text-stone-600 hover:bg-stone-200/50 hover:text-stone-900"
                                }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r bg-emerald-600" />
                                )}
                                <Icon className={`h-4.5 w-4.5 transition-colors shrink-0 ${isActive ? "text-emerald-600" : "text-stone-400 group-hover:text-stone-600"}`} />
                                <span className="truncate">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Footer Profile Node & Sign Out */}
            <div className="p-4 border-t border-stone-200/60 bg-stone-100/50 flex flex-col gap-3 shrink-0">
                <div className="px-2">
                    <p className="text-xs font-medium text-stone-800 truncate">{name || "Farmer"}</p>
                    <p className="text-[11px] text-stone-500 truncate">Workspace manager</p>
                </div>
                <LogoutButton />
            </div>
        </div>
    );
};

export default Sidebar;