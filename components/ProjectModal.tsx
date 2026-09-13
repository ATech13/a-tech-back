'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/types';
import { X, Check, Layers, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { backdropVariants, modalVariants, MOTION_DURATIONS, MOTION_EASE } from '@/lib/motion';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'apercu' | 'fonctionnalites' | 'architecture'>('apercu');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-6 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-lenis-prevent="true"
            className="bg-[#091B0E] border border-[#a3e635]/30 rounded-3xl max-w-[720px] w-full shadow-2xl relative z-10 my-auto text-white overflow-hidden flex flex-col max-h-[85vh]"
          >
            {/* Modal Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Fermer la fenêtre du projet"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#08140B]/90 text-gray-300 hover:text-white hover:bg-[#0F2818] border border-white/20 hover:border-[#a3e635] flex items-center justify-center transition-colors cursor-pointer shadow-lg"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Project Image Header Banner */}
            <div className="relative h-56 sm:h-72 w-full bg-[#08140B] overflow-hidden shrink-0">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="720px"
                className="object-cover object-center opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091B0E] via-[#091B0E]/50 to-transparent" />

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-end justify-between gap-2">
                <div>
                  <span className="px-3 py-1 rounded-full bg-[#a3e635] text-[#08140B] font-mono text-xs font-bold uppercase tracking-wider mb-1.5 inline-block">
                    {project.category}
                  </span>
                  <h2 id="modal-project-title" className="text-2xl sm:text-4xl font-extrabold text-white">
                    {project.title}
                  </h2>
                  {project.subtitle && (
                    <p className="text-xs sm:text-sm text-[#a3e635] font-mono">
                      {project.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Content Container - Scrollable Body */}
            <div className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1">

              {/* Navigation Tabs inside modal */}
              <div className="flex border-b border-white/10 gap-6 text-xs sm:text-sm font-mono">
                <button
                  onClick={() => setActiveTab('apercu')}
                  className={`pb-3 font-bold transition-colors cursor-pointer border-b-2 ${
                    activeTab === 'apercu'
                      ? 'border-[#a3e635] text-[#a3e635]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  Aperçu & Impact
                </button>
                <button
                  onClick={() => setActiveTab('fonctionnalites')}
                  className={`pb-3 font-bold transition-colors cursor-pointer border-b-2 ${
                    activeTab === 'fonctionnalites'
                      ? 'border-[#a3e635] text-[#a3e635]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  Fonctionnalités
                </button>
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`pb-3 font-bold transition-colors cursor-pointer border-b-2 ${
                    activeTab === 'architecture'
                      ? 'border-[#a3e635] text-[#a3e635]'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  Architecture & Stack
                </button>
              </div>

              {/* Tab 1: Aperçu */}
              {activeTab === 'apercu' && (
                <div className="space-y-6">
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                    {project.fullDescription || project.description}
                  </p>

                  {/* Stats badges */}
                  {project.stats && (
                    <div className="grid grid-cols-3 gap-3 bg-[#08140B] p-4 rounded-2xl border border-white/10 text-center">
                      {project.stats.users && (
                        <div>
                          <div className="text-xs font-mono text-gray-400">Utilisateurs / Portée</div>
                          <div className="text-base font-bold text-white mt-1">{project.stats.users}</div>
                        </div>
                      )}
                      {project.stats.performance && (
                        <div>
                          <div className="text-xs font-mono text-gray-400">Uptime / Latence</div>
                          <div className="text-base font-bold text-[#a3e635] mt-1">{project.stats.performance}</div>
                        </div>
                      )}
                      {project.stats.rating && (
                        <div>
                          <div className="text-xs font-mono text-gray-400">Évaluation</div>
                          <div className="text-base font-bold text-amber-400 mt-1">{project.stats.rating}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Technologies */}
                  <div>
                    <h4 className="text-xs font-mono text-gray-400 uppercase mb-3">Technologies Clés</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-lg bg-[#0F2818] border border-[#a3e635]/20 text-xs font-mono text-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Fonctionnalités */}
              {activeTab === 'fonctionnalites' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-[#a3e635] uppercase tracking-wider">
                    Fonctionnalités Métier & Utilisateur
                  </h4>
                  <ul className="space-y-2.5">
                    {project.features && project.features.length > 0 ? (
                      project.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 bg-[#08140B] p-3.5 rounded-xl border border-white/10 text-xs sm:text-sm text-gray-300">
                          <Check className="w-4 h-4 text-[#a3e635] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs sm:text-sm text-gray-400">Architecture haute performance et UI adaptative sur mesure.</li>
                    )}
                  </ul>
                </div>
              )}

              {/* Tab 3: Architecture */}
              {activeTab === 'architecture' && (
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-[#a3e635] uppercase tracking-wider">
                    Architecture Technique & Choix de Conception
                  </h4>
                  <div className="space-y-2.5">
                    {project.architecture && project.architecture.length > 0 ? (
                      project.architecture.map((arch, i) => (
                        <div key={i} className="flex items-start gap-3 bg-[#08140B] p-3.5 rounded-xl border border-white/10 text-xs sm:text-sm text-gray-300">
                          <Layers className="w-4 h-4 text-[#a3e635] shrink-0 mt-0.5" />
                          <span>{arch}</span>
                        </div>
                      ))
                    ) : (
                      <div className="bg-[#08140B] p-4 rounded-xl border border-white/10 text-xs sm:text-sm text-gray-300">
                        Développement modulaire selon la méthodologie Clean Code, composants réutilisables, sécurité des données et API REST sécurisées.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Footer Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-3">
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2.5 rounded-xl bg-[#08140B] text-gray-300 border border-white/20 hover:text-white hover:border-[#a3e635] transition-colors text-xs font-mono flex items-center gap-2"
                    >
                      <Globe className="w-3.5 h-3.5 text-[#a3e635]" />
                      <span>Ouvrir la démo / Repo</span>
                    </motion.a>
                  )}
                </div>

                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
                  className="px-6 py-2.5 rounded-xl bg-[#a3e635] text-[#08140B] font-bold text-xs sm:text-sm hover:bg-[#b5f448] transition-colors cursor-pointer"
                >
                  Fermer
                </motion.button>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
