'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, Eye, Zap, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { MOTION_DURATIONS, MOTION_EASE } from '@/lib/motion';

export const ProjectsSection: React.FC = () => {
  const { t, projects } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filterOptions = [
    { key: 'ALL', label: t('filterAll') },
    { key: 'Fullstack', label: 'Fullstack' },
    { key: 'Frontend', label: 'Frontend' },
    { key: 'Outils', label: t('skills') === 'Skills' ? 'Tools' : 'Outils' },
  ];

  const filteredProjects =
    selectedFilter === 'ALL'
      ? projects
      : projects.filter((p) => {
          if (selectedFilter === 'Outils') return p.category === 'Outils';
          return p.category === selectedFilter;
        });

  // Flagship featured project (Noboté)
  const heroProject = filteredProjects.find((p) => p.id === 'nobote') || filteredProjects[0];
  const secondaryProjects = filteredProjects.filter((p) => p.id !== heroProject?.id);

  return (
    <section id="projets" className="py-24 relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Editorial Header */}
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
              <span>{t('projectsBadge')}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {t('projectsSectionTitle')} & <span className="text-[#a3e635]">Projets Phares</span>
            </h2>
            <p className="mt-3 text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              {t('projectsSectionDesc')}
            </p>
          </div>

          {/* Category Filter Pills with Gliding Motion Indicator */}
          <div className="flex flex-wrap items-center gap-2">
            {filterOptions.map((filter) => {
              const isActive = selectedFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#08140B] font-bold'
                      : 'bg-[#091B0E] text-gray-300 hover:text-white border border-white/10 hover:border-[#a3e635]/40'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="projectFilterActivePill"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      className="absolute inset-0 bg-[#a3e635] rounded-xl shadow-md shadow-[#a3e635]/20"
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* 1. FEATURED HERO CASE STUDY (Flagship Anchor) */}
        {heroProject && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: MOTION_DURATIONS.section, ease: MOTION_EASE.smooth }}
            className="mb-14 rounded-3xl bg-[#091B0E] border border-[#a3e635]/30 overflow-hidden shadow-2xl hover:border-[#a3e635]/60 transition-colors duration-300 group"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Column: Case Study Narrative */}
              <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#a3e635] text-[#08140B] text-[11px] font-mono font-black uppercase tracking-wider">
                      Flagship Case Study
                    </span>
                    <span className="text-xs font-mono text-gray-400">
                      {heroProject.category}
                    </span>
                  </div>

                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-[#a3e635] transition-colors">
                    {heroProject.title}
                  </h3>
                  {heroProject.subtitle && (
                    <p className="text-sm font-mono text-[#a3e635] mt-1 mb-4">
                      {heroProject.subtitle}
                    </p>
                  )}

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {heroProject.fullDescription || heroProject.description}
                  </p>

                  {/* Highlighted Metrics & Proof */}
                  {heroProject.stats && (
                    <div className="grid grid-cols-3 gap-3 mb-6 bg-[#08140B] p-4 rounded-2xl border border-white/10">
                      {heroProject.stats.users && (
                        <div>
                          <div className="text-xs font-mono text-gray-400">Impact</div>
                          <div className="text-sm sm:text-base font-bold text-white mt-0.5">{heroProject.stats.users}</div>
                        </div>
                      )}
                      {heroProject.stats.performance && (
                        <div>
                          <div className="text-xs font-mono text-gray-400">Fiabilité</div>
                          <div className="text-sm sm:text-base font-bold text-[#a3e635] mt-0.5">{heroProject.stats.performance}</div>
                        </div>
                      )}
                      {heroProject.stats.rating && (
                        <div>
                          <div className="text-xs font-mono text-gray-400">Satisfaction</div>
                          <div className="text-sm sm:text-base font-bold text-white mt-0.5">{heroProject.stats.rating}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Architecture Highlights */}
                  {heroProject.features && heroProject.features.length > 0 && (
                    <div className="space-y-2 mb-6 text-xs text-gray-300 font-mono">
                      {heroProject.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Zap className="w-3.5 h-3.5 text-[#a3e635] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {heroProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#0F2818] border border-[#a3e635]/20 text-[11px] font-mono text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                  <motion.button
                    onClick={() => setSelectedProject(heroProject)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
                    className="px-6 py-3 rounded-xl bg-[#a3e635] text-[#08140B] font-bold text-sm hover:bg-[#b5f448] transition-colors flex items-center gap-2 cursor-pointer shadow-lg shadow-[#a3e635]/20"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Détails & Architecture</span>
                  </motion.button>

                  {heroProject.githubUrl && heroProject.githubUrl !== '#' && (
                    <motion.a
                      href={heroProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
                      className="px-5 py-3 rounded-xl bg-[#08140B] text-gray-300 hover:text-white border border-white/15 hover:border-[#a3e635]/50 text-sm font-mono flex items-center gap-2 transition-colors"
                    >
                      <span>Accéder au site</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#a3e635]" />
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Right Column: Hero Media */}
              <div className="lg:col-span-6 relative min-h-[280px] sm:min-h-[400px] bg-[#08140B] overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
                <Image
                  src={heroProject.image}
                  alt={heroProject.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091B0E] via-transparent to-transparent opacity-60 pointer-events-none" />
              </div>

            </div>
          </motion.div>
        )}

        {/* 2. SECONDARY PROJECTS EDITORIAL GRID WITH MOTION */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {secondaryProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: MOTION_DURATIONS.standard, ease: MOTION_EASE.smooth }}
                whileHover={{ y: -3 }}
                className="bg-[#091B0E] border border-white/10 hover:border-[#a3e635]/50 rounded-2xl overflow-hidden flex flex-col justify-between group transition-colors duration-200 hover:shadow-xl hover:shadow-[#a3e635]/10"
              >
                <div>
                  {/* Media Container */}
                  <div className="relative h-48 w-full bg-[#08140B] overflow-hidden border-b border-white/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-104 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091B0E] via-transparent to-transparent opacity-70" />
                    
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#08140B]/80 backdrop-blur-md border border-white/15 text-[#a3e635] font-mono text-[10px] font-bold">
                      {project.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#a3e635] transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    {project.subtitle && (
                      <p className="text-xs font-mono text-gray-400 mb-3 line-clamp-1">
                        {project.subtitle}
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 mb-5 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-[#0F2818] border border-white/10 text-[10px] font-mono text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-5 sm:px-6 pb-5 pt-0">
                  <motion.button
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
                    className="w-full py-2.5 rounded-xl bg-[#08140B] hover:bg-[#a3e635] border border-white/15 hover:border-[#a3e635] text-gray-200 hover:text-[#08140B] font-bold text-xs transition-colors duration-150 flex items-center justify-center gap-2 group/btn cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#a3e635] group-hover/btn:text-[#08140B] transition-colors" />
                    <span>{t('viewProjectBtn')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover/btn:text-[#08140B] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal Detail View */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
