import React from 'react';
import { Sparkles, Bot } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FloatingAITriggerProps {
  onOpenAI: () => void;
}

export const FloatingAITrigger: React.FC<FloatingAITriggerProps> = ({ onOpenAI }) => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip / Speech Bubble */}
      {/* <div className="hidden sm:flex items-center gap-2 bg-[#091B0E]/95 border border-[#a3e635] text-white text-xs font-medium px-3.5 py-2 rounded-2xl shadow-2xl backdrop-blur-md opacity-90 group-hover:opacity-100 transition-all transform group-hover:-translate-x-1 animate-pulse">
        <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping shrink-0" />
        <span>Une question ? <strong>Parler à Aaron AI</strong></span>
      </div> */}

      {/* Main Floating Button */}
      <button
        onClick={onOpenAI}
        aria-label="Ouvrir l'assistant Aaron AI Copilot"
        title="Ouvrir l'assistant Aaron AI Copilot"
        className="relative flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-[#0F2818] via-[#143d22] to-[#0F2818] border-2 border-[#a3e635] text-white shadow-[0_0_25px_rgba(163,230,53,0.4)] hover:shadow-[0_0_40px_rgba(163,230,53,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {/* Glow Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#a3e635]/30 blur-md group-hover:bg-[#a3e635]/60 transition-all animate-pulse" />

        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#a3e635] text-[#08140B]">
          <Sparkles className="w-5 h-5 animate-spin-slow" />
        </div>

        <div className="relative hidden sm:flex flex-col text-left">
          <span className="text-xs font-black text-white tracking-wide flex items-center gap-1.5">
            Aaron AI <span className="bg-[#a3e635] text-[#08140B] text-[9px] px-1.5 py-0.2 rounded font-mono font-bold">GEMINI</span>
          </span>
          <span className="text-[10px] text-[#a3e635] font-mono">Copilot Interactif</span>
        </div>

        <div className="relative sm:hidden flex items-center font-bold text-xs text-[#a3e635]">
          AI
        </div>
      </button>
    </div>
  );
};
