"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { RegisterSchema, RegisterInput } from "@/lib/validations/register.schema"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const RegisterForm = () => {
    const router = useRouter();

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit = async(data: RegisterInput) => {
        setServerError("");

        const res = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if(!res.ok){
            setServerError(result.message);
            return
        }

        router.push("/login")
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
        >
        <div>
            <Input
            placeholder="Full Name"
            {...register("name")}
            />

            {errors.name && (
            <p className="text-sm text-red-500 mt-1">
                {errors.name.message}
            </p>
            )}
        </div>

        <div>
            <Input
                placeholder="Email"
                {...register("email")}
            />

            {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                </p>
            )}
        </div>

        <div>
            <Input
                type="password"
                placeholder="Password"
                {...register("password")}
            />

            {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                    {errors.password.message}
                </p>
            )}
        </div>

        {serverError && (
            <p className="text-red-500 text-sm">
            {serverError}
            </p>
        )}

        <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
        >
            {isSubmitting
            ? "Creating account..."
            : "Create Account"}
        </Button>
    </form>
    );
}

export default RegisterForm
