"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileHeaderProps {
  sidebarComponent: React.ReactNode;
}

export default function MobileHeader({ sidebarComponent }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Banner Strip - Only visible on Mobile */}
      <header className="flex h-14 items-center justify-between border-b border-stone-200 bg-white px-4 md:hidden shrink-0 select-none">
        <span className="text-sm font-bold tracking-tight text-stone-900">
          CropTrack
        </span>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9 text-stone-500 hover:bg-stone-100"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open Menu</span>
        </Button>
      </header>

      {/* Slide-out Sidebar Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop blur effect */}
          <div 
            className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer Body Container */}
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white border-r border-stone-200 animate-in slide-in-from-left duration-200">
            {/* Close trigger anchor */}
            <div className="absolute right-2 top-2 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-stone-400 hover:text-stone-900 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close Menu</span>
              </Button>
            </div>

            {/* Embedded Sidebar Instance */}
            <div className="h-full w-full" onClick={() => setIsOpen(false)}>
              {sidebarComponent}
            </div>
          </div>
        </div>
      )}
    </>
  );
}