'use client';
import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { MOTION_DURATIONS, MOTION_EASE } from '@/lib/motion';

interface FloatingAITriggerProps {
  onOpenAI: () => void;
}

export const FloatingAITrigger: React.FC<FloatingAITriggerProps> = ({ onOpenAI }) => {
  return (
    <div className="fixed bottom-22 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      <motion.button
        type="button"
        onClick={onOpenAI}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
        aria-label="Ouvrir l'assistant Aaron AI Copilot"
        title="Ouvrir l'assistant Aaron AI Copilot"
        className="relative flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full bg-[#091B0E]/95 backdrop-blur-md border border-[#a3e635]/50 hover:border-[#a3e635] text-white shadow-xl shadow-black/60 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#a3e635] text-[#08140B] shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>

        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
            Aaron AI
            <span className="bg-[#a3e635] text-[#08140B] text-[9px] px-1 rounded font-mono font-bold">
              GEMINI
            </span>
          </span>
          <span className="text-[10px] text-gray-400 font-mono">
            Copilot Interactif
          </span>
        </div>

        <span className="sm:hidden font-mono font-bold text-xs text-[#a3e635] pr-1">
          AI
        </span>
      </motion.button>
    </div>
  );
};
