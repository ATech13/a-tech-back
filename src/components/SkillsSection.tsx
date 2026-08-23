import React, { useState } from 'react';
import { SKILLS } from '../data/portfolioData';
import { Skill } from '../types';
import { useLanguage } from '../context/LanguageContext';
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
  Info
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { t, skills } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  const categories = [
    { key: 'ALL', label: t('allCategories') },
    { key: 'Frontend', label: t('skillsCatFrontend') },
    { key: 'Backend', label: t('skillsCatBackend') },
    { key: 'DevOps & Outils', label: t('skillsCatDevOps') },
    { key: 'Montage Vidéo', label: t('skillsCatVideo') },
  ];

  const filteredSkills =
    selectedCategory === 'ALL'
      ? skills
      : skills.filter((s) => s.category === selectedCategory);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
        return <Atom className="w-5 h-5 text-[#a3e635]" />;
      case 'FileCode':
        return <FileCode className="w-5 h-5 text-[#a3e635]" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-[#a3e635]" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-[#a3e635]" />;
      case 'Server':
        return <Server className="w-5 h-5 text-[#a3e635]" />;
      case 'Database':
        return <Database className="w-5 h-5 text-[#a3e635]" />;
      case 'HardDrive':
        return <HardDrive className="w-5 h-5 text-[#a3e635]" />;
      case 'Network':
        return <Network className="w-5 h-5 text-[#a3e635]" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-[#a3e635]" />;
      case 'Box':
        return <Box className="w-5 h-5 text-[#a3e635]" />;
      case 'Github':
        return <Github className="w-5 h-5 text-[#a3e635]" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-[#a3e635]" />;
      case 'Video':
        return <Video className="w-5 h-5 text-[#a3e635]" />;
      case 'Clapperboard':
        return <Clapperboard className="w-5 h-5 text-[#a3e635]" />;
      case 'Mic':
        return <Mic className="w-5 h-5 text-[#a3e635]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#a3e635]" />;
      default:
        return <Code className="w-5 h-5 text-[#a3e635]" />;
    }
  };

  const getCategoryHeaderIcon = (cat: string) => {
    switch (cat) {
      case 'Frontend':
        return <Code className="w-6 h-6 text-[#a3e635]" />;
      case 'Backend':
        return <Server className="w-6 h-6 text-[#a3e635]" />;
      case 'DevOps & Outils':
        return <Terminal className="w-6 h-6 text-[#a3e635]" />;
      case 'Montage Vidéo':
        return <Video className="w-6 h-6 text-[#a3e635]" />;
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

  // Group skills by category for "Tous" mode to replicate exact screenshot design
  const groupedCategories: ('Frontend' | 'Backend' | 'DevOps & Outils' | 'Montage Vidéo')[] = [
    'Frontend',
    'Backend',
    'DevOps & Outils',
    'Montage Vidéo',
  ];

  return (
    <section id="competences" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-xs font-mono text-[#a3e635] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#a3e635]" />
            <span>{t('skillsBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('skillsSectionTitle')} <span className="text-[#a3e635]">Techniques</span>
          </h2>
          <p className="mt-3 text-gray-300 text-sm sm:text-base max-w-xl mx-auto">
            {t('skillsSectionDesc')}
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${selectedCategory === cat.key
                ? 'bg-[#a3e635] text-[#08140B] font-bold shadow-lg shadow-[#a3e635]/25 scale-105'
                : 'bg-[#091B0E] text-gray-300 hover:text-white border border-[#a3e635]/20 hover:border-[#a3e635]/50'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skill Groups View */}
        <div className="space-y-12">
          {groupedCategories
            .filter((cat) => selectedCategory === 'Tous' || selectedCategory === cat)
            .map((cat) => {
              const catSkills = skills.filter((s) => s.category === cat);
              return (
                <div
                  key={cat}
                  className="bg-[#091B0E]/80 border border-[#a3e635]/20 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl"
                >
                  {/* Category Title & Subtitle */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                    <div className="p-3 rounded-2xl bg-[#0F2818] border border-[#a3e635]/30">
                      {getCategoryHeaderIcon(cat)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                        {getCategoryLabel(cat)}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400">
                        {getCategorySubtitle(cat)}
                      </p>
                    </div>
                  </div>

                  {/* Skill Cards Grid matching reference screenshot layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {catSkills.map((skill) => (
                      <div
                        key={skill.name}
                        onClick={() => setActiveSkill(skill)}
                        className="bg-[#08140B] border border-[#a3e635]/15 hover:border-[#a3e635] rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:shadow-[#a3e635]/10"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-[#0F2818] border border-[#a3e635]/20 group-hover:scale-110 transition-transform">
                              {renderIcon(skill.iconName)}
                            </div>
                            <div>
                              <h4 className="text-base font-bold text-white group-hover:text-[#a3e635] transition-colors">
                                {skill.name}
                              </h4>
                              <span className="text-[11px] text-gray-400 font-mono">
                                {skill.level}%
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-lg font-black font-mono text-[#a3e635]">
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Animated Progress Bar */}
                        <div className="w-full bg-[#0F2818] h-2.5 rounded-full overflow-hidden border border-[#a3e635]/10 p-0.5">
                          <div
                            className="bg-gradient-to-r from-[#84CC16] to-[#a3e635] h-full rounded-full transition-all duration-1000 ease-out shadow-sm shadow-[#a3e635]"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        {skill.description && (
                          <p className="mt-2 text-xs text-gray-400 font-light line-clamp-1 group-hover:line-clamp-none transition-all">
                            {skill.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>

        {/* Skill Detail Modal */}
        {activeSkill && (
          <div className="fixed inset-0 z-100 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#091B0E] border border-[#a3e635] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-scaleUp">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-[#0F2818] border border-[#a3e635]">
                    {renderIcon(activeSkill.iconName)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {activeSkill.name}
                    </h3>
                    <span className="text-xs font-mono text-[#a3e635]">
                      {getCategoryLabel(activeSkill.category)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSkill(null)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">{t('masteryLevel')}</span>
                    <span className="font-bold font-mono text-[#a3e635]">
                      {activeSkill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-[#0F2818] h-3 rounded-full overflow-hidden border border-[#a3e635]/30">
                    <div
                      className="bg-[#a3e635] h-full rounded-full"
                      style={{ width: `${activeSkill.level}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#08140B] p-4 rounded-xl border border-[#a3e635]/20 text-sm text-gray-300">
                  <p className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#a3e635] shrink-0 mt-0.5" />
                    <span>Details & Usage</span>
                  </p>
                  {activeSkill.description ||
                    'Maîtrise approfondie appliquée sur les projets AXIUM, Rartech et architectures de pointe.'}
                </div>

              </div>

              <button
                onClick={() => setActiveSkill(null)}
                className="mt-6 w-full py-2.5 rounded-full bg-[#a3e635] text-[#08140B] font-bold text-sm cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
