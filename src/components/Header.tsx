import React, { useState, useEffect } from 'react';
import { Terminal, Sparkles, Calculator, Menu, X, Code2, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#08140B]/90 backdrop-blur-md border-b border-[#a3e635]/15 py-3 shadow-xl shadow-[#08140B]/80'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#accueil"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('accueil');
          }}
          className="flex items-center gap-3 group cursor-pointer"
        >
          <div className="font-bold text-2xl">
            A<span className="font-light text-[#aee51a]">TECH</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 bg-[#0C2013]/70 px-6 py-2 rounded-full border border-[#a3e635]/10 backdrop-blur-sm">
          <button
            onClick={() => scrollToSection('accueil')}
            className="text-sm font-medium text-gray-300 hover:text-[#a3e635] transition-colors cursor-pointer"
          >
            {t('home')}
          </button>
          <button
            onClick={() => scrollToSection('a-propos')}
            className="text-sm font-medium text-gray-300 hover:text-[#a3e635] transition-colors cursor-pointer"
          >
            {t('about')}
          </button>
          <button
            onClick={() => scrollToSection('competences')}
            className="text-sm font-medium text-gray-300 hover:text-[#a3e635] transition-colors cursor-pointer"
          >
            {t('skills')}
          </button>
          <button
            onClick={() => scrollToSection('projets')}
            className="text-sm font-medium text-gray-300 hover:text-[#a3e635] transition-colors cursor-pointer"
          >
            {t('projects')}
          </button>
          <button
            onClick={() => scrollToSection('contacts')}
            className="text-sm font-medium text-gray-300 hover:text-[#a3e635] transition-colors cursor-pointer"
          >
            {t('contact')}
          </button>
        </nav>



        {/* Language change */}
        {/* <button
          onClick={toggleLanguage}
          className="px-3 py-2 rounded-xl bg-[#0F2818] border border-[#a3e635]/30 text-[#a3e635] flex items-center gap-1.5 text-xs font-mono font-bold"
        >
          <Globe className="w-4 h-4 text-[#a3e635]" />
          <span>{language.toUpperCase()}</span>
        </button> */}

        


        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Terminal button */}
          <button
            onClick={onOpenTerminal}
            title="Ouvrir le terminal interactif"
            className="p-2.5 rounded-xl bg-[#0F2818] border border-[#a3e635]/20 text-[#a3e635] hover:border-[#a3e635] hover:bg-[#a3e635]/10 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono"
          >
            <Terminal className="w-4 h-4 text-[#a3e635]" />
            <span>CLI</span>
          </button>

          {/* AI Copilot button */}
          {/* <button
            onClick={onOpenAI}
            title="Poser une question à Aaron AI Copilot"
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#0F2818] via-[#143d22] to-[#0F2818] border-2 border-[#a3e635] text-[#a3e635] hover:bg-[#a3e635] hover:text-[#08140B] shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.6)] transition-all duration-300 cursor-pointer flex items-center gap-2 text-xs font-bold relative group"
          >
            <Sparkles className="w-4 h-4 text-[#a3e635] group-hover:text-[#08140B] animate-pulse" />
            <span className="group-hover:text-[#08140B]">Aaron AI</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] group-hover:bg-[#08140B] animate-ping absolute -top-1 -right-1 border border-[#08140B]" />
          </button> */}

          {/* Estimator button */}
          <button
            onClick={onOpenEstimator}
            title="Estimer votre projet"
            className="p-2.5 rounded-xl bg-[#0F2818] border border-[#a3e635]/20 text-gray-300 hover:text-[#a3e635] hover:border-[#a3e635] transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          >
            <Calculator className="w-4 h-4 text-[#a3e635]" />
            <span>{t('estimator')}</span>
          </button>

          {/* Commencer CTA button */}
          <button
            onClick={() => scrollToSection('contacts')}
            className="px-5 py-2.5 rounded-full bg-[#a3e635] text-[#08140B] font-bold text-sm hover:bg-[#bbf246] transition-all hover:shadow-lg hover:shadow-[#a3e635]/25 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            {t('start')}
          </button>
        </div>

        {/* Mobile controls & toggle */}
        <div className="flex lg:hidden items-center gap-2">
          {/* <button
            onClick={onOpenAI}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0F2818] to-[#143d22] border-2 border-[#a3e635] text-[#a3e635] flex items-center gap-1.5 text-xs font-bold shadow-[0_0_12px_rgba(163,230,53,0.3)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#a3e635] animate-pulse" />
            <span>Aaron AI</span>
          </button> */}
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-[#0F2818] border border-[#a3e635]/30 text-[#a3e635]"
            title="Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[#0F2818] text-white border border-[#a3e635]/20"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#08140B]/98 border-b border-[#a3e635]/20 px-6 py-6 flex flex-col gap-4 animate-fadeIn">
          <button
            onClick={() => scrollToSection('accueil')}
            className="text-left text-base font-medium text-white hover:text-[#a3e635] py-2 border-b border-white/5"
          >
            {t('home')}
          </button>
          <button
            onClick={() => scrollToSection('a-propos')}
            className="text-left text-base font-medium text-white hover:text-[#a3e635] py-2 border-b border-white/5"
          >
            {t('about')}
          </button>
          <button
            onClick={() => scrollToSection('competences')}
            className="text-left text-base font-medium text-white hover:text-[#a3e635] py-2 border-b border-white/5"
          >
            {t('skills')}
          </button>
          <button
            onClick={() => scrollToSection('projets')}
            className="text-left text-base font-medium text-white hover:text-[#a3e635] py-2 border-b border-white/5"
          >
            {t('projects')}
          </button>
          <button
            onClick={() => scrollToSection('contacts')}
            className="text-left text-base font-medium text-white hover:text-[#a3e635] py-2 border-b border-white/5"
          >
            {t('contact')}
          </button>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAI();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#0F2818] via-[#143d22] to-[#0F2818] border-2 border-[#a3e635] text-[#a3e635] font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(163,230,53,0.3)]"
            >
              <Sparkles className="w-5 h-5 animate-pulse text-[#a3e635]" />
              <span>{t('chatWithAI')}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full py-3 rounded-xl bg-[#0F2818] border border-[#a3e635]/30 text-gray-200 font-mono text-sm flex items-center justify-center gap-2 hover:text-[#a3e635]"
            >
              <Calculator className="w-4 h-4 text-[#a3e635]" /> {t('estimateProject')}
            </button>
            <button
              onClick={() => scrollToSection('contacts')}
              className="w-full py-3 rounded-full bg-[#a3e635] text-[#08140B] font-bold text-center text-sm"
            >
              {t('start')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
