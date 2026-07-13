"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sprout, ArrowRight } from "lucide-react";

// Set to true if the user is logged in, false if not
const isLoggedIn = false; 

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-50/60 text-stone-800 font-sans antialiased flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. SIMPLE HEADER */}
      <header className="w-full bg-white border-b border-stone-200/50 select-none shrink-0">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-white shadow-sm">
              <Sprout className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold tracking-tight text-stone-900">
              Crop<span className="text-emerald-600">Track</span>
            </span>
          </Link>
          
          <nav className="flex items-center text-xs font-medium">
            {isLoggedIn ? (
              <Link 
                href="/dashboard" 
                className="rounded-lg bg-stone-900 px-4 py-2 text-white shadow-sm transition hover:bg-stone-800"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link 
                href="/login" 
                className="rounded-lg bg-emerald-600 px-4 py-2 text-white shadow-sm transition hover:bg-emerald-700"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* 2. MAIN HERO SECTION */}
      <section className="flex-1 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 lg:px-8 flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          
          {/* Left Text Block */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl"
          >
            <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl leading-[1.15]">
              Run your farm smoothly with a clear, simple digital workspace.
            </h1>
            
            <p className="mt-4 text-base leading-relaxed text-stone-500">
              CropTrack is an easy-to-use platform built for farmers. It brings your crop tracking, harvest history, spending logs, daily notes, and weather updates into one calm dashboard so you can stay organized with less effort.
            </p>

            <div className="mt-8">
              <Link
                href={isLoggedIn ? "/dashboard" : "/login"}
                className="group inline-flex items-center gap-2 rounded-lg bg-stone-900 px-5 py-3 text-xs font-semibold text-white shadow-xs transition hover:bg-stone-800"
              >
                {isLoggedIn ? "Open Dashboard" : "Get Started Now"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Crop Image Canvas */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full max-w-md aspect-4/3 lg:aspect-square relative rounded-xl border border-stone-200 overflow-hidden bg-stone-100 shadow-xs shrink-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1625246333195-78d9c38ad451?q=80&w=2070&auto=format&fit=crop"
              alt="Fresh green farm crop rows"
              fill
              priority
              className="object-cover"
              sizes="(max-w-lg) 100vw, 40vw"
            />
          </motion.div>

        </div>
      </section>

      {/* 3. FOOTER STRIP */}
      <footer className="w-full border-t border-stone-200/50 bg-white shrink-0 select-none">
        <div className="mx-auto max-w-6xl px-6 py-5 text-[11px] text-stone-400 text-center sm:text-left tracking-wide">
          © 2026 CropTrack. Built to keep your farm planning organized and simple.
        </div>
      </footer>
    </main>
  );
}