import RegisterForm from "@/components/forms/RegisterForm";
import { Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
            
            {/* Left Column: Form Container (Takes up exactly half the width on large screens) */}
            <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:max-w-2xl xl:max-w-3xl bg-stone-50/30">
                <div className="mx-auto w-full max-w-[360px]">
                    
                    {/* Centered Large Logo Asset */}
                    <div className="flex items-center justify-center">
                        <div className="relative h-44 w-44 overflow-hidden p-1">
                            <Image 
                                src="/crop-track-logo.png" 
                                alt="CropTrack Logo"
                                width={176} // Set width to match the h-44 space (44 * 4 = 176px)
                                height={176} 
                                priority
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Headline Matrix */}
                    <div className="flex flex-col space-y-1.5 mb-6 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
                            Create an account
                        </h1>
                        <p className="text-xs text-stone-500">
                            Get started by setting up your manager credentials
                        </p>
                    </div>

                    {/* Authentication Shell */}
                    <RegisterForm />

                    {/* Navigation Routing Anchor */}
                    <div className="mt-6 border-t border-stone-200/50 pt-4 text-center">
                        <p className="text-xs text-stone-500">
                            Already have an account?{" "}
                            <Link 
                                href="/login" 
                                className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-4 transition-colors"
                            >
                                Sign in instead
                            </Link>
                        </p>
                    </div>

                </div>
            </div>

            {/* Right Column: High-Visibility Prominent Farm Image Showcase */}
            <div className="relative h-64 sm:h-80 lg:h-auto lg:flex-1 bg-stone-900 overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JvcHxlbnwwfHwwfHx8MA%3D%3D"
                    alt="Lush green crop sprouts layout rows view"
                    fill
                    priority
                    className="absolute inset-0 h-full w-full object-cover opacity-90 contrast-[1.05] brightness-90"
                    sizes="(max-w-lg) 100vw, 50vw"
                />
                
                {/* Subtle vignette layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/20" />

                {/* Overlaid Information Card Capsule Container */}
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 max-w-xl z-10 backdrop-blur-md bg-stone-950/40 border border-white/10 p-5 sm:p-6 rounded-xl text-white hidden sm:block">
                    <Quote className="h-5 w-5 text-emerald-400 mb-2.5 opacity-80" />

                    <p className="text-xs sm:text-sm font-medium text-stone-100 leading-relaxed">
                        &ldquo;Every successful harvest starts with good planning. Track your crops,
                        monitor your progress, and make better farming decisions with confidence.&rdquo;
                    </p>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-white">CropTrack</p>
                            <p className="text-[10px] text-stone-300">
                                Helping farmers stay organized
                            </p>
                        </div>

                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium tracking-wide uppercase">
                            Smart Farming
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}