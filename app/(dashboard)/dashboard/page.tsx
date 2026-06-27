import DashboardStats from "@/components/dashboard/DashboardStats";
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"


const DashboardPage = async() => {
    const session = await auth();

    if (!session){
        redirect("/login")
    }

    return (
        <div>
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>

            <DashboardStats />
        </div>
    )
}

export default DashboardPage
