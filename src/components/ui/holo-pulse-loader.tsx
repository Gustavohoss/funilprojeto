'use client'
import React from 'react'
import { PlusIcon } from 'lucide-react'

export function HoloPulse({ messages, currentMessageIndex }: { messages: string[], currentMessageIndex: number }) {
  return (
    <div className='w-full flex flex-col justify-center items-center gap-8'>
      {/* Compact Mini-Hologram Loader */}
      <div className="relative flex items-center justify-center scale-125">
        <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full scale-150 animate-pulse" />
        
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="absolute w-[1px] h-24 bg-primary" />
            <div className="absolute w-24 h-[1px] bg-primary" />
        </div>

        {/* Main Ring System */}
        <div className="relative p-2 border border-dashed border-primary/20 rounded-full animate-[spin_4s_linear_infinite]">
            
            <div className="w-20 h-20 border border-dashed border-primary/40 rounded-full flex justify-center items-center animate-[spin_2.5s_linear_infinite_reverse]">
                <div className="relative z-10 p-1.5 bg-background rounded-full border border-primary/30 shadow-[0_0_20px_-5px_hsl(var(--primary))]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-[pulse_2s_ease-in-out_infinite] w-8 h-8">
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                    </svg>
                </div>
            </div>
            
            {/* 4 Orbiting Dots at Cardinal Points */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-primary/80 rounded-full shadow-[0_0_10px_hsl(var(--primary))]" />
            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary/80 rounded-full shadow-[0_0_10px_hsl(var(--primary))]" />
            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_hsl(var(--primary))]" />
        </div>
      </div>

      <div className="flex flex-col items-center mt-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white font-headline transition-opacity duration-300">
            {messages[currentMessageIndex]}
        </h2>
      </div>
    </div>
  )
}
