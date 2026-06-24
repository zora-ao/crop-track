import RegisterForm from "@/components/forms/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted">
            <div className="w-full max-w-md rounded-lg border bg-background p-8 shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">
                Create Account 🌱
                </h1>

                <RegisterForm />
            </div>
        </div>
    );
}