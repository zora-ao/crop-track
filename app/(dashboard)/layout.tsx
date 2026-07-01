import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    
    if (!session) {
        redirect("/login")
    }

    return (
        // 1. Fixed dimensions using h-dvh (Dynamic Viewport Height) for bulletproof mobile scrolling
        <div className="flex h-dvh w-screen overflow-hidden bg-stone-100/40 font-sans antialiased text-stone-800">
            
            {/* 2. Responsive Sidebar Wrapper */}
            <aside className="hidden md:block shrink-0 h-full border-r border-stone-200 bg-white">
                <Sidebar />
            </aside>

            {/* Main content column */}
            <div className="flex flex-1 flex-col h-full overflow-hidden">
                
                {/* 3. Blurred Sticky Header */}
                <header className="border-b border-stone-200/80 bg-white/70 backdrop-blur-md sticky top-0 z-10 w-full shrink-0">
                    <Navbar name={session.user?.name as string} />
                </header>

                {/* 4. Widget Scroll Pane */}
                {/* FIXED: Reduced the heavy pb-24 padding to a standard p-4 / sm:p-6 everywhere */}
                <main className="flex-1 overflow-y-auto bg-stone-50/40 custom-scrollbar">
                    {/* Max-width container prevents widgets from looking stretched on massive 4K monitors */}
                    <div className="max-w-full mx-auto space-y-6">
                        {children}
                    </div>
                </main>
                
            </div>
        </div>
    )
}

export default layout;