'use client';
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { MOTION_DURATIONS, MOTION_EASE } from '@/lib/motion';
import {
  Code,
  Server,
  Terminal,
  Video,
  Atom,
  FileCode,
  Palette,
  Layout,
  HardDrive,
  Database,
  Network,
  GitBranch,
  Box,
  Github,
  Workflow,
  Clapperboard,
  Mic,
  Sparkles,
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { t, skills } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { key: 'ALL', label: t('allCategories') },
    { key: 'Frontend', label: t('skillsCatFrontend') },
    { key: 'Backend', label: t('skillsCatBackend') },
    { key: 'DevOps & Outils', label: t('skillsCatDevOps') },
    { key: 'Montage Vidéo', label: t('skillsCatVideo') },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return <Atom className="w-4 h-4 text-[#a3e635]" />;
      case 'FileCode':
        return <FileCode className="w-4 h-4 text-[#a3e635]" />;
      case 'Palette':
        return <Palette className="w-4 h-4 text-[#a3e635]" />;
      case 'Layout':
        return <Layout className="w-4 h-4 text-[#a3e635]" />;
      case 'Server':
        return <Server className="w-4 h-4 text-[#a3e635]" />;
      case 'Database':
        return <Database className="w-4 h-4 text-[#a3e635]" />;
      case 'HardDrive':
        return <HardDrive className="w-4 h-4 text-[#a3e635]" />;
      case 'Network':
        return <Network className="w-4 h-4 text-[#a3e635]" />;
      case 'GitBranch':
        return <GitBranch className="w-4 h-4 text-[#a3e635]" />;
      case 'Box':
        return <Box className="w-4 h-4 text-[#a3e635]" />;
      case 'Github':
        return <Github className="w-4 h-4 text-[#a3e635]" />;
      case 'Workflow':
        return <Workflow className="w-4 h-4 text-[#a3e635]" />;
      case 'Video':
        return <Video className="w-4 h-4 text-[#a3e635]" />;
      case 'Clapperboard':
        return <Clapperboard className="w-4 h-4 text-[#a3e635]" />;
      case 'Mic':
        return <Mic className="w-4 h-4 text-[#a3e635]" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-[#a3e635]" />;
      default:
        return <Code className="w-4 h-4 text-[#a3e635]" />;
    }
  };

  const getCategoryHeaderIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend':
        return <Code className="w-5 h-5 text-[#a3e635]" />;
      case 'Backend':
        return <Server className="w-5 h-5 text-[#a3e635]" />;
      case 'DevOps & Outils':
        return <Terminal className="w-5 h-5 text-[#a3e635]" />;
      case 'Montage Vidéo':
        return <Video className="w-5 h-5 text-[#a3e635]" />;
      default:
        return null;
    }
  };

  const getCategorySubtitle = (cat: string) => {
    switch (cat) {
      case 'Frontend':
        return t('catFrontendSub');
      case 'Backend':
        return t('catBackendSub');
      case 'DevOps & Outils':
        return t('catDevOpsSub');
      case 'Montage Vidéo':
        return t('catVideoSub');
      default:
        return '';
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'Frontend':
        return t('skillsCatFrontend');
      case 'Backend':
        return t('skillsCatBackend');
      case 'DevOps & Outils':
        return t('skillsCatDevOps');
      case 'Montage Vidéo':
        return t('skillsCatVideo');
      default:
        return cat;
    }
  };

  const domainCategories: ('Frontend' | 'Backend' | 'DevOps & Outils' | 'Montage Vidéo')[] = [
    'Frontend',
    'Backend',
    'DevOps & Outils',
    'Montage Vidéo',
  ];

  const displayedCategories =
    selectedCategory === 'ALL'
      ? domainCategories
      : domainCategories.filter((c) => c === selectedCategory);

  return (
    <section id="competences" className="py-24 relative z-10 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Badge & Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: MOTION_DURATIONS.section, ease: MOTION_EASE.smooth }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-xs font-mono text-[#a3e635] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#a3e635]" />
              <span>{t('skillsBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t('skillsSectionTitle')} <span className="text-[#a3e635]">Techniques</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-xl leading-relaxed">
              {t('skillsSectionDesc')}
            </p>
          </div>

          {/* Category Filter Tabs with Motion Pill */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#08140B] font-bold'
                      : 'bg-[#091B0E] text-gray-300 hover:text-white border border-white/10 hover:border-[#a3e635]/40'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="skillsActiveFilterPill"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      className="absolute inset-0 bg-[#a3e635] rounded-xl shadow-md shadow-[#a3e635]/20"
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Skill Groups View */}
        <motion.div layout className="space-y-10">
          <AnimatePresence mode="popLayout">
            {displayedCategories.map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              return (
                <motion.div
                  key={cat}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: MOTION_DURATIONS.standard, ease: MOTION_EASE.smooth }}
                  className="bg-[#091B0E] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="p-2.5 rounded-xl bg-[#08140B] border border-white/15">
                      {getCategoryHeaderIcon(cat)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {getCategoryLabel(cat)}
                      </h3>
                      <p className="text-xs font-mono text-gray-400 mt-0.5">
                        {getCategorySubtitle(cat)}
                      </p>
                    </div>
                  </div>

                  {/* Skill Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {catSkills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ y: -1 }}
                        className="bg-[#08140B] border border-white/10 hover:border-[#a3e635]/40 rounded-xl p-4 transition-colors flex flex-col justify-between"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="p-2 rounded-lg bg-[#0F2818] border border-[#a3e635]/20 shrink-0">
                              {renderIcon(skill.iconName)}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-white">
                                {skill.name}
                              </h4>
                              {skill.description && (
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {skill.description}
                                </p>
                              )}
                            </div>
                          </div>

                          <span className="text-xs font-mono font-bold text-[#a3e635] shrink-0">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress indicator */}
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, ease: MOTION_EASE.smooth }}
                            className="h-full bg-[#a3e635] rounded-full"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
