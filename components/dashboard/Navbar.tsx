import LogoutButton from "./LogoutButton"


interface NavbarProps {
    name?: string
}

const Navbar = ({name}: NavbarProps) => {
    return (
        <header className="h-16 border-b flex items-center justify-between px-6">
            <h1 className="font-semibold">
                Welcome, {name || "Farmer"}
            </h1>

            <LogoutButton />
        </header>
    )
}

export default Navbar
