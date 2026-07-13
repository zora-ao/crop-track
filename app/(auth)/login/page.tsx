import LoginForm from "@/components/forms/LoginForm";
import { Quote } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-white font-sans antialiased select-none">
            
            {/* Left Column: Form Container (Takes up exactly half the width on large screens) */}
            <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:max-w-2xl xl:max-w-3xl bg-stone-50/30">
                <div className="mx-auto w-full max-w-[360px]">
                    
                    {/* Centered Logo Asset */}
                    <div className="flex items-center justify-center ">
                        <div className="relative h-44 w-44 overflow-hidden p-1">
                            <Image 
                                src="/crop-track-logo.png" 
                                alt="CropTrack Logo"
                                width={94}
                                height={94}
                                priority
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Headline Matrix */}
                    <div className="flex flex-col space-y-1.5 mb-6 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight text-stone-900">
                            Welcome back
                        </h1>
                        <p className="text-xs text-stone-500">
                            Enter your credentials below to access your workspace
                        </p>
                    </div>

                    {/* Authentication Shell */}
                    <LoginForm />

                    {/* Navigation Routing Anchor */}
                    <div className="mt-6 border-t border-stone-200/50 pt-4 text-center">
                        <p className="text-xs text-stone-500">
                            Don&apos;t have an account yet?{" "}
                            <Link 
                                href="/register" 
                                className="font-medium text-emerald-600 hover:text-emerald-700 hover:underline underline-offset-4 transition-colors"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>

                </div>
            </div>

            {/* Right Column: High-Visibility Prominent Farm Image Showcase */}
            {/* Now highly visible on mobile (h-64 stacked on top) and takes up exactly half the desktop monitor screen */}
            <div className="relative h-64 sm:h-80 lg:h-auto lg:flex-1 bg-stone-900 overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2070&auto=format&fit=crop"
                    alt="Sustainable farm rows background landscape"
                    fill
                    priority
                    className="absolute inset-0 h-full w-full object-cover opacity-90 contrast-[1.05] brightness-90"
                    sizes="(max-w-lg) 100vw, 50vw"
                />
                
                {/* Subtle vignette layer overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/20" />

                {/* Overlaid Testimonial Card Capsule Container (Hidden on mobile cards, highly readable on tablet/desktop) */}
                <div className="absolute bottom-6 left-6 right-6 sm:bottom-12 sm:left-12 sm:right-12 max-w-xl z-10 backdrop-blur-md bg-stone-950/40 border border-white/10 p-5 sm:p-6 rounded-xl text-white hidden sm:block">
                    <Quote className="h-5 w-5 text-emerald-400 mb-2.5 opacity-80" />
                    <p className="text-xs sm:text-sm font-medium text-stone-100 leading-relaxed">
                        &ldquo;Managing crop life-cycles, multi-field yields, and tracking volatile operational asset margins across our sectors used to require disconnected text logs. This platform has aggregated our metrics into a streamlined workspace.&rdquo;
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-white">Hensley Agronomics Corp</p>
                            <p className="text-[10px] text-stone-300">Regional Operations Node</p>
                        </div>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium tracking-wide uppercase">
                            Verified User
                        </span>
                    </div>
                </div>
            </div>

        </div>
    );
}