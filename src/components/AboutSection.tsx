import React from 'react';
import { PERSONAL_INFO, METRICS, VALUE_PILLARS } from '../data/portfolioData';
import { Lightbulb, Zap, ShieldCheck, ArrowRight, Award, CheckCircle2, Building2 } from 'lucide-react';
import profile from "../assets/bg/atech2.png"
import { useLanguage } from '../context/LanguageContext';

interface AboutSectionProps {
  onOpenEstimator: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenEstimator }) => {
  const { t, personalInfo, metrics, valuePillars } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-[#a3e635]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#a3e635]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#a3e635]" />;
      default:
        return <Award className="w-6 h-6 text-[#a3e635]" />;
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contacts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="a-propos" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-xs font-mono text-[#a3e635] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#a3e635]" />
            <span>à-propos</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-4xl mx-auto leading-tight">
            {t('aboutSectionTitlePrefix')} <span className="text-[#a3e635]">|</span> {t('aboutSectionTitleSuffix')}
          </h2>
        </div>

        {/* Main Profile Card */}
        <div className="bg-[#091B0E]/90 border border-[#a3e635]/20 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Profile Avatar with Neon Ring */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#a3e635] to-emerald-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse" />
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#a3e635] shadow-2xl bg-[#08140B]">
                  <img
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-500"
                  />
                </div>
                <div className="absolute bottom-2 right-2 bg-[#08140B] text-[#a3e635] border border-[#a3e635] p-2.5 rounded-full shadow-lg">
                  <Building2 className="w-5 h-5" />
                </div>
              </div>
              <span className="mt-4 text-xs font-mono text-gray-400 bg-[#0F2818] px-3 py-1 rounded-full border border-[#a3e635]/20">
                {t('basedIn')} {personalInfo.location}
              </span>
            </div>

            {/* Bio Content */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                {personalInfo.bio}
              </p>

              {/* Highlighted Quote Box */}
              <div className="p-5 rounded-2xl bg-[#0F2818]/80 border-l-4 border-[#a3e635] text-gray-200 text-sm sm:text-base font-medium italic shadow-inner">
                "{personalInfo.quote}"
              </div>

              {/* Quick Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635] shrink-0" />
                  <span>{t('techLeadershipAXIUM')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635] shrink-0" />
                  <span>{t('rartechContribution')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635] shrink-0" />
                  <span>{t('scalableFullstackApps')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635] shrink-0" />
                  <span>{t('videoContentCreation')}</span>
                </div>
              </div>
            </div>

          </div>
        </div>


        {/* Metrics Grid Cards matching reference layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-[#091B0E]/80 border border-[#a3e635]/20 hover:border-[#a3e635] rounded-2xl p-6 text-center backdrop-blur-md transition-all duration-300 transform hover:-translate-y-1 shadow-lg group"
            >
              <div className="text-4xl sm:text-5xl font-black text-[#a3e635] font-mono mb-2 group-hover:scale-110 transition-transform">
                {metric.value}
              </div>
              <div className="text-sm sm:text-base font-bold text-white mb-1">
                {metric.label}
              </div>
              {metric.description && (
                <div className="text-xs text-gray-400 font-light hidden sm:block">
                  {metric.description}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Value Pillars Grid matching reference layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {valuePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#091B0E]/80 border border-[#a3e635]/15 hover:border-[#a3e635] rounded-2xl p-6 backdrop-blur-md transition-all duration-300 shadow-xl group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0F2818] border border-[#a3e635]/30 flex items-center justify-center mb-4 group-hover:bg-[#a3e635]/10 transition-colors">
                  {getIcon(pillar.icon)}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#a3e635] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call To Action Banner matching reference illustration */}
        <div className="bg-gradient-to-r from-[#0F2818] via-[#091B0E] to-[#0F2818] border border-[#a3e635]/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
              {t('readyToBuildTitle')}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              {t('readyToBuildDesc')}
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-4 shrink-0">
            <button
              onClick={onOpenEstimator}
              className="px-6 py-3 rounded-full bg-[#08140B] text-[#a3e635] border border-[#a3e635] font-bold text-sm hover:bg-[#a3e635]/10 transition-all cursor-pointer"
            >
              {t('estimateBudgetBtn')}
            </button>
            <button
              onClick={scrollToContact}
              className="px-6 py-3 rounded-full bg-[#a3e635] text-[#08140B] font-bold text-sm hover:bg-[#bbf246] transition-all cursor-pointer shadow-lg shadow-[#a3e635]/20 flex items-center gap-2 group"
            >
              <span>{t('contactMeBtn')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>


      </div>
    </section>
  );
};
