import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"


const DashboardPage = async() => {
    const session = await auth();

    if (!session){
        redirect("/login")
    }

    return (
        <div>
            <h1>This is the Dashboard page</h1>
        </div>
    )
}

export default DashboardPage
