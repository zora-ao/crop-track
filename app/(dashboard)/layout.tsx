import Navbar from '@/components/dashboard/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    
    if (!session){
        redirect("/login")
    }

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1'>
                <Navbar name={session.user?.name as string} />

                <main className='p-6'>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default layout
