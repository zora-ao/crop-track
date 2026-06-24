"use client";

import { signIn } from "next-auth/react";
import { LoginInput, LoginSchema } from "@/lib/validations/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../input";
import { Button } from "../button";


const LoginForm = () => {
    const router = useRouter();

    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = async(data: LoginInput) => {
        setServerError("");

        const result = await signIn("credentials", {
            ...data,
            redirect: false
        });

        if (result?.error){
            setServerError("Invalid Credentials");
            return
        }

        router.push("/dashboard");
    }

    return (
    <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        >
        <div>
            <Input
            placeholder="Email"
            {...register("email")}
            />

            {errors.email && (
            <p className="text-red-500 text-sm mt-1">
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
            <p className="text-red-500 text-sm mt-1">
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
            ? "Signing In..."
            : "Sign In"}
        </Button>
        </form>
    );
}

export default LoginForm
