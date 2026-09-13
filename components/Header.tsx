'use client';
import React, { useState, useEffect } from 'react';
import { Terminal, Calculator, Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { MOTION_DURATIONS, MOTION_EASE } from '@/lib/motion';

interface HeaderProps {
  onOpenTerminal: () => void;
  onOpenAI: () => void;
  onOpenEstimator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTerminal,
  onOpenAI,
  onOpenEstimator,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section for desktop indicator
  useEffect(() => {
    const sections = ['accueil', 'a-propos', 'competences', 'projets', 'contacts'];
    const elements = sections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -40% 0px', threshold: [0.1, 0.3] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'accueil', label: t('home') },
    { id: 'a-propos', label: t('about') },
    { id: 'competences', label: t('skills') },
    { id: 'projets', label: t('projects') },
    { id: 'contacts', label: t('contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08140B]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <motion.a
          href="#accueil"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('accueil');
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 group cursor-pointer select-none"
        >
          <div className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">
            A<span className="text-[#a3e635] font-light">TECH</span>
          </div>
        </motion.a>

        {/* Desktop Navigation Pill Bar with Motion gliding indicator */}
        <nav className="hidden md:flex items-center gap-1 bg-[#091B0E]/80 px-2.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#a3e635] font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="headerActivePill"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 bg-[#0F2818] rounded-full border border-[#a3e635]/25 shadow-sm"
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Language Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <motion.button
            type="button"
            onClick={toggleLanguage}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
            title={language === 'fr' ? 'Switch to English' : 'Passer en Français'}
            className="px-2.5 py-1.5 rounded-xl bg-[#091B0E] border border-white/10 hover:border-[#a3e635]/50 text-gray-300 hover:text-[#a3e635] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-[#a3e635]" />
            <span>{language.toUpperCase()}</span>
          </motion.button>

          {/* Terminal Trigger */}
          <motion.button
            type="button"
            onClick={onOpenTerminal}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
            title="Ouvrir le terminal CLI"
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#091B0E] border border-white/10 hover:border-[#a3e635]/50 text-gray-300 hover:text-[#a3e635] text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5 text-[#a3e635]" />
            <span className="hidden sm:inline">CLI</span>
          </motion.button>

          {/* Desktop Estimator Button */}
          <motion.button
            type="button"
            onClick={onOpenEstimator}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
            title="Estimer votre projet"
            className="hidden lg:flex p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[#091B0E] border border-white/10 hover:border-[#a3e635]/50 text-gray-300 hover:text-[#a3e635] text-xs font-medium items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5 text-[#a3e635]" />
            <span>{t('estimator')}</span>
          </motion.button>

          {/* Desktop Start CTA */}
          <motion.button
            type="button"
            onClick={() => scrollToSection('contacts')}
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
            className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-[#a3e635] text-[#08140B] font-bold text-xs hover:bg-[#b5f448] transition-colors cursor-pointer shadow-sm shadow-[#a3e635]/20"
          >
            {t('start')}
          </motion.button>
        </div>

      </div>
    </header>
  );
};
