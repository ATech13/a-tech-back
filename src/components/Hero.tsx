import React from 'react';
import { ArrowDown, Code2, Sparkles, Terminal as TerminalIcon, Cpu, Zap } from 'lucide-react';
import logo from "../assets/logos/atech-logo.png";
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenAI }) => {
  const { t } = useLanguage();

  const scrollToAbout = () => {
    const el = document.getElementById('a-propos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#a3e635]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center text-center">

        {/* Top Logo Badge */}
        {/* <div className="mb-6 transform hover:scale-105 transition-transform duration-300">
          <ATechLogo size="lg" />
        </div> */}

        {/* Top Terminal Snippet Box */}
        <div 
          onClick={onOpenTerminal}
          className="group cursor-pointer max-w-xl w-full bg-[#091B0E]/80 border border-[#a3e635]/25 hover:border-[#a3e635] rounded-2xl p-4 sm:p-5 backdrop-blur-md mb-8 shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-gray-400 ml-2">atech-terminal ~ zsh</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#a3e635] group-hover:underline">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>Ouvrir CLI</span>
            </div>
          </div>

          <div className="font-mono text-left text-xs sm:text-sm space-y-1.5">
            <p className="text-[#a3e635] flex items-center gap-2">
              <span className="text-gray-500">$</span> echo AaronTech
            </p>
            <p className="text-gray-300 pl-4 border-l-2 border-[#a3e635]/40">
              <span className="text-amber-400">›</span> CEO AXIUM + Cofondateur
            </p>
            <p className="text-gray-300 pl-4 border-l-2 border-[#a3e635]/40">
              <span className="text-cyan-400">›</span> Rartech • Noboté • Ecocinq
            </p>
            <p className="text-[#a3e635] pl-4 border-l-2 border-[#a3e635] font-semibold">
              <span className="text-[#a3e635]">›</span> Vision <span className="text-white px-1.5 py-0.5 rounded text-xs font-black">
                <span className="text-rotate">
                            <span className="justify-items-center">
                                <span>Founder</span>
                                <span>Builder</span>
                                <span>Innovator</span>
                                <span>Leader</span>
                                <span>Creator</span>
                                <span>Product</span>
                            </span>
                        </span>
              </span>
            </p>
          </div>
        </div>

        {/* Main Title Hero Banner */}
        <div className="relative my-4 flex flex-col md:flex-row items-center justify-center gap-4 max-w-5xl w-full">
          {/* Oversized Brand Typography */}
            <img src={logo} alt="" className="md:h-100 w-auto" />
          {/* <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight uppercase flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-white drop-shadow-2xl">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              AARON
            </span>
            <span className="bg-[#a3e635] text-[#08140B] px-4 py-1 sm:px-6 sm:py-2 rounded-2xl shadow-xl shadow-[#a3e635]/30 transform hover:scale-105 transition-transform duration-300 inline-block">
              TECH
            </span>
          </h1> */}
        </div>

        {/* Subtitle & Value Proposition */}
        <p className="mt-6 max-w-2xl text-base sm:text-xl text-gray-300 font-light leading-relaxed">
          {t('heroTitle')}. <br className="hidden sm:inline" />
          {t('heroDesc')}
        </p>

        {/* Featured AI Copilot Prominent Launch Banner */}
        {/* <div className="mt-8 max-w-2xl w-full">
          <button
            onClick={onOpenAI}
            className="w-full relative group overflow-hidden rounded-2xl bg-gradient-to-r from-[#0F2818] via-[#143d22] to-[#0F2818] border-2 border-[#a3e635] p-4 sm:p-5 text-left shadow-[0_0_30px_rgba(163,230,53,0.25)] hover:shadow-[0_0_50px_rgba(163,230,53,0.5)] hover:scale-[1.02] transition-all duration-300 cursor-pointer"
          >
            
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#a3e635] text-[#08140B] font-mono font-black text-[10px] uppercase rounded-bl-xl tracking-wider flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 fill-[#08140B]" />
              Assistant AI En Direct
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-xl bg-[#a3e635] text-[#08140B] shadow-lg shrink-0 group-hover:rotate-12 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-extrabold text-white text-base sm:text-xl group-hover:text-[#a3e635] transition-colors">
                    Interrogez mon Copilot AI (Gemini)
                  </h2>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-ping" />
                </div>
                <p className="text-xs sm:text-sm text-gray-300 font-light mt-1 leading-snug">
                  Posez des questions sur mes projets (Noboté, Eclypse, GenioTech), compétences, devis ou mon rôle chez AXIUM !
                </p>
              </div>
            </div>
          </button>
        </div> */}

        {/* Quick Badge Chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-mono text-gray-400">
          <span className="px-3.5 py-1.5 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-[#a3e635] flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> High Performance
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-gray-200 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-[#a3e635]" /> Architecture Full-Stack
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-gray-200 flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-[#a3e635]" /> Clean Code
          </span>
        </div>

        {/* Down Scroll Button */}
        <div className="mt-14 flex flex-col items-center gap-3">
          <button
            onClick={scrollToAbout}
            aria-label="Découvrir"
            className="w-16 h-16 rounded-full bg-[#a3e635] text-[#08140B] flex items-center justify-center shadow-2xl shadow-[#a3e635]/40 hover:bg-[#bbf246] hover:scale-110 transition-all duration-300 cursor-pointer group"
          >
            <ArrowDown className="w-7 h-7 group-hover:translate-y-1 transition-transform" />
          </button>
          <span className="text-xs font-mono text-[#a3e635]/80 uppercase tracking-widest">
            Faites défiler
          </span>
        </div>

        {/* Navigation Tag Pill Badge */}
        {/* <div className="mt-12 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F2818] border border-[#a3e635]/25 text-xs font-mono text-[#a3e635]">
          <span className="w-2 h-2 rounded-full bg-[#a3e635] animate-ping" />
          <span>• à-propos</span>
        </div> */}

      </div>
    </section>
  );
};
