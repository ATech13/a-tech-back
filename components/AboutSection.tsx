'use client';
import React from 'react';
import Image from 'next/image';
import { Lightbulb, Zap, ShieldCheck, ArrowRight, Award, CheckCircle2, Building2, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { MOTION_DURATIONS, MOTION_EASE } from '@/lib/motion';

interface AboutSectionProps {
  onOpenEstimator: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenEstimator }) => {
  const { t, personalInfo, metrics, valuePillars } = useLanguage();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-[#a3e635]" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-[#a3e635]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#a3e635]" />;
      default:
        return <Award className="w-5 h-5 text-[#a3e635]" />;
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contacts');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="a-propos" className="py-24 relative z-10 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: MOTION_DURATIONS.section, ease: MOTION_EASE.smooth }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-xs font-mono text-[#a3e635] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#a3e635]" />
            <span>À Propos d'Aaron Tech</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t('aboutSectionTitlePrefix')} <span className="text-[#a3e635]">/</span> {t('aboutSectionTitleSuffix')}
          </h2>
        </motion.div>

        {/* Main Profile Editorial Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: MOTION_DURATIONS.section, ease: MOTION_EASE.smooth }}
          className="bg-[#091B0E] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Profile Avatar & Location */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center">
              <div className="relative">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-white/15 bg-[#08140B] shadow-xl">
                  <Image
                    src={personalInfo.avatar}
                    alt={personalInfo.name}
                    fill
                    sizes="(max-width: 640px) 192px, 224px"
                    className="object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-[#08140B] text-[#a3e635] border border-white/20 p-2.5 rounded-xl shadow-lg flex items-center gap-1.5 text-xs font-mono">
                  <Building2 className="w-4 h-4" />
                  <span>AXIUM</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-mono text-gray-400 bg-[#08140B] px-3.5 py-1.5 rounded-lg border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#a3e635]" />
                <span>{personalInfo.location}</span>
              </div>
            </div>

            {/* Bio Content & Credentials */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed font-normal">
                {personalInfo.bio}
              </p>

              {/* Quote */}
              <blockquote className="p-4 sm:p-5 rounded-xl bg-[#08140B] border-l-3 border-[#a3e635] text-gray-200 text-sm sm:text-base italic font-normal">
                "{personalInfo.quote}"
              </blockquote>

              {/* Verified Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635] shrink-0" />
                  <span>{t('techLeadershipAXIUM')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635] shrink-0" />
                  <span>{t('rartechContribution')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635] shrink-0" />
                  <span>{t('scalableFullstackApps')}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#a3e635] shrink-0" />
                  <span>{t('videoContentCreation')}</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Verified Metrics Strip with Motion */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION_DURATIONS.standard, delay: idx * 0.05, ease: MOTION_EASE.smooth }}
              whileHover={{ y: -2 }}
              className="bg-[#091B0E] border border-white/10 hover:border-[#a3e635]/50 rounded-2xl p-6 text-center transition-colors shadow-lg"
            >
              <div className="text-3xl sm:text-5xl font-extrabold text-[#a3e635] font-mono mb-2">
                {metric.value}
              </div>
              <div className="text-sm font-bold text-white mb-1">
                {metric.label}
              </div>
              {metric.description && (
                <div className="text-xs text-gray-400 font-light hidden sm:block">
                  {metric.description}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {valuePillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: MOTION_DURATIONS.standard, delay: idx * 0.08, ease: MOTION_EASE.smooth }}
              whileHover={{ y: -2 }}
              className="bg-[#091B0E] border border-white/10 hover:border-white/25 rounded-2xl p-6 transition-colors shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#08140B] border border-white/15 flex items-center justify-center mb-4">
                  {getIcon(pillar.icon)}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Collaboration Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: MOTION_DURATIONS.section, ease: MOTION_EASE.smooth }}
          className="bg-[#091B0E] border border-[#a3e635]/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              {t('readyToBuildTitle')}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              {t('readyToBuildDesc')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <motion.button
              onClick={onOpenEstimator}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-3 rounded-xl bg-[#08140B] text-gray-200 border border-white/20 hover:border-[#a3e635] text-xs font-mono transition-colors cursor-pointer"
            >
              {t('estimateBudgetBtn')}
            </motion.button>
            <motion.button
              onClick={scrollToContact}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl bg-[#a3e635] text-[#08140B] font-bold text-sm hover:bg-[#b5f448] transition-colors cursor-pointer shadow-md shadow-[#a3e635]/20 flex items-center gap-2 group"
            >
              <span>{t('contactMeBtn')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
