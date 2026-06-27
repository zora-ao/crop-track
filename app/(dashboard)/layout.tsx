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
        <div className="flex h-screen w-screen overflow-hidden bg-stone-100/40 font-sans antialiased text-stone-800">
            <Sidebar />

            <div className="flex flex-1 flex-col h-full overflow-hidden">
                <header className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-10">
                    <Navbar name={session.user?.name as string} />
                </header>

                <main className="flex-1 overflow-y-auto bg-stone-50/50 p-4 md:p-6 lg:p-8 pb-28 md:pb-6 custom-scrollbar">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default layout