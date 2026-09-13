'use client';
import React from 'react';
import { ArrowDown, Sparkles, Terminal as TerminalIcon, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { MOTION_DURATIONS, MOTION_EASE, staggerContainerVariants, staggerItemVariants } from '@/lib/motion';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenAI }) => {
  const { language } = useLanguage();

  const scrollToAbout = () => {
    const el = document.getElementById('a-propos');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projets');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden border-b border-white/5">
      {/* Restrained ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-[#a3e635]/8 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex flex-col items-center text-center"
      >
        {/* 1. Status Eyebrow Badge (Soft & Modern) */}
        <motion.div
          variants={staggerItemVariants}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#091B0E]/80 border border-white/10 hover:border-[#a3e635]/30 backdrop-blur-md shadow-lg shadow-black/20 mb-6 transition-colors select-none"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a3e635] opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a3e635]" />
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono">
            <span className="text-gray-400">Goma, RDC</span>
            <span className="text-white/20 select-none">/</span>
            <span className="text-white font-medium">CEO AXIUM</span>
            <span className="hidden sm:inline text-white/20 select-none">·</span>
            <span className="hidden sm:inline text-gray-300">Full-Stack Architect</span>
          </div>
        </motion.div>

        {/* 2. Primary Heading with strong human typography */}
        <motion.h1
          variants={staggerItemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.1]"
        >
          Architecturer le web avec <span className="text-[#a3e635]">rigueur</span> & vision produit.
        </motion.h1>

        {/* 3. Subtitle & Value Proposition with controlled line length */}
        <motion.p
          variants={staggerItemVariants}
          className="mt-6 max-w-2xl text-base sm:text-lg text-gray-300 font-normal leading-relaxed"
        >
          {language === 'fr' ? (
            <>
              Je suis <strong>Aaron Tech</strong> (Aaron Lumoo). Je conçois des plateformes web et mobiles à haute disponibilité, de l’écosystème <strong>Noboté</strong> et <strong>AXIUMarket</strong> aux outils cloud d’entreprise.
            </>
          ) : (
            <>
              I am <strong>Aaron Tech</strong> (Aaron Lumoo). I design high-availability web and mobile platforms, from the <strong>Noboté</strong> and <strong>AXIUMarket</strong> ecosystems to enterprise cloud tools.
            </>
          )}
        </motion.p>

        {/* 4. Action CTAs */}
        <motion.div
          variants={staggerItemVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <motion.button
            onClick={scrollToProjects}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
            className="px-6 py-3.5 rounded-xl bg-[#a3e635] text-[#08140B] font-bold text-sm hover:bg-[#b5f448] transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-[#a3e635]/20 group"
          >
            <span>Explorer les Réalisations</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>

          <motion.button
            onClick={onOpenAI}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
            className="px-5 py-3.5 rounded-xl bg-[#091B0E] hover:bg-[#0F2818] border border-white/15 hover:border-[#a3e635]/60 text-white font-mono text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#a3e635]" />
            <span>Consulter Aaron AI (Gemini)</span>
          </motion.button>
        </motion.div>

        {/* 5. Terminal Snippet Box (Interactive CLI Preview) */}
        <motion.div
          variants={staggerItemVariants}
          onClick={onOpenTerminal}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onOpenTerminal();
          }}
          whileHover={{ y: -2 }}
          transition={{ duration: MOTION_DURATIONS.hover, ease: MOTION_EASE.smooth }}
          aria-label="Ouvrir le terminal interactif CLI"
          className="group cursor-pointer mt-10 max-w-xl w-full bg-[#091B0E]/50 border border-white/10 hover:border-[#a3e635]/40 rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-xl shadow-black/40 transition-all duration-300 text-left"
        >
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white/15 group-hover:bg-red-500/60 transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15 group-hover:bg-yellow-500/60 transition-colors" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/15 group-hover:bg-emerald-500/60 transition-colors" />
              <span className="text-[11px] font-mono text-gray-400 ml-1.5">zsh · atech-cli</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400 group-hover:text-[#a3e635] transition-colors whitespace-nowrap">
              <TerminalIcon className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#a3e635] transition-colors" />
              <span>Ouvrir CLI</span>
              <kbd className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                ↵
              </kbd>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="font-mono text-xs sm:text-[13px] space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="text-[#a3e635] font-bold select-none">$</span>
              <span className="text-white font-medium">atech --profile</span>
            </div>

            <div className="pl-3 border-l border-white/10 space-y-1.5 text-xs">
              <div className="flex flex-wrap sm:flex-nowrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-gray-400 text-[11px] w-16 shrink-0 select-none">role</span>
                <span className="text-gray-300">CEO @ AXIUM · Full-Stack Architect</span>
              </div>
              <div className="flex flex-wrap sm:flex-nowrap items-baseline gap-x-2 gap-y-0.5">
                <span className="text-gray-400 text-[11px] w-16 shrink-0 select-none">shipped</span>
                <span className="text-gray-300">Noboté (15K+ voters) · GenioTech · AXIUMarket</span>
              </div>
              <div className="flex flex-wrap sm:flex-nowrap items-baseline gap-x-2 gap-y-0.5 pt-0.5">
                <span className="text-gray-400 text-[11px] w-16 shrink-0 select-none">status</span>
                <span className="inline-flex items-center gap-1.5 text-gray-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635] shrink-0 animate-pulse" />
                  <span>Disponible pour projets à fort impact</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 6. Down Scroll Indicator */}
        <motion.button
          variants={staggerItemVariants}
          onClick={scrollToAbout}
          whileTap={{ scale: 0.95 }}
          aria-label="Faire défiler vers la section À Propos"
          className="mt-14 p-2 text-gray-500 hover:text-[#a3e635] transition-colors cursor-pointer group flex flex-col items-center gap-1"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-gray-400 group-hover:text-[#a3e635] transition-colors">
            À Propos
          </span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </motion.button>
      </motion.div>
    </section>
  );
};
