import Sidebar from '@/components/dashboard/Sidebar';
import MobileHeader from '@/components/dashboard/MobileHeader';
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    
    if (!session) {
        redirect("/login")
    }

    // Generate a single template component reference to share across views
    const sidebarInstance = <Sidebar name={session.user?.name as string} />;

    return (
        <div className="flex h-dvh w-screen overflow-hidden bg-stone-100/40 font-sans antialiased text-stone-800">
            
            {/* Desktop Mode Sidebar Layout Frame (Hidden entirely on small phones) */}
            <aside className="hidden md:block shrink-0 h-full bg-white z-20">
                {sidebarInstance}
            </aside>

            {/* Primary Action Matrix Workspace */}
            <div className="flex flex-1 flex-col h-full overflow-hidden w-full">
                
                {/* Mobile Top Header Banner (Mounts and runs hamburger click transitions) */}
                <MobileHeader sidebarComponent={sidebarInstance} />

                {/* Main Scroll Pane for User Dashboards and UI Widgets */}
                <main className="flex-1 overflow-y-auto bg-stone-50/40 custom-scrollbar p-4 sm:p-6 lg:p-8">
                    <div className="max-w-full mx-auto">
                        {children}
                    </div>
                </main>
                
            </div>
        </div>
    )
}

export default Layout;