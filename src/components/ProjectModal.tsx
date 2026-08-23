import React, { useState } from 'react';
import { Project } from '../types';
import { ExternalLink, Github, X, Check, Star, Users, Gauge, Layers, Eye } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'apercu' | 'fonctionnalites' | 'architecture'>('apercu');

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-6 flex min-h-full items-center justify-center animate-fadeIn">
      <div className="bg-[#091B0E] border border-[#a3e635]/40 rounded-3xl max-w-[700px] w-full shadow-2xl relative my-auto text-white overflow-hidden flex flex-col max-h-[80vh] sm:max-h-[78vh]">

        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#08140B]/90 text-gray-300 hover:text-white hover:bg-[#0F2818] border border-[#a3e635]/40 flex items-center justify-center transition-colors cursor-pointer shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Image Header Banner */}
        <div className="relative h-52 sm:h-72 w-full bg-[#08140B] overflow-hidden shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091B0E] via-[#091B0E]/40 to-transparent" />

          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <span className="px-3 py-1 rounded-full bg-[#a3e635] text-[#08140B] font-mono text-xs font-bold uppercase tracking-wider mb-1.5 inline-block">
                {project.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
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
          <div className="flex border-b border-white/10 gap-4">
            <button
              onClick={() => setActiveTab('apercu')}
              className={`pb-3 text-sm font-bold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'apercu'
                  ? 'border-[#a3e635] text-[#a3e635]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Aperçu
            </button>
            <button
              onClick={() => setActiveTab('fonctionnalites')}
              className={`pb-3 text-sm font-bold transition-colors cursor-pointer border-b-2 ${
                activeTab === 'fonctionnalites'
                  ? 'border-[#a3e635] text-[#a3e635]'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Fonctionnalités
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className={`pb-3 text-sm font-bold transition-colors cursor-pointer border-b-2 ${
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
              <p className="text-gray-300 text-base leading-relaxed">
                {project.fullDescription}
              </p>

              {/* Stats badges */}
              {project.stats && (
                <div className="grid grid-cols-3 gap-3 bg-[#08140B] p-4 rounded-2xl border border-[#a3e635]/20 text-center">
                  {project.stats.users && (
                    <div>
                      <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#a3e635]" /> Utilisateurs
                      </div>
                      <div className="text-sm font-bold text-white font-mono mt-1">
                        {project.stats.users}
                      </div>
                    </div>
                  )}
                  {project.stats.rating && (
                    <div>
                      <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Star className="w-3.5 h-3.5 text-[#a3e635]" /> Note
                      </div>
                      <div className="text-sm font-bold text-white font-mono mt-1">
                        {project.stats.rating}
                      </div>
                    </div>
                  )}
                  {project.stats.performance && (
                    <div>
                      <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                        <Gauge className="w-3.5 h-3.5 text-[#a3e635]" /> Performance
                      </div>
                      <div className="text-sm font-bold text-white font-mono mt-1">
                        {project.stats.performance}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tech Stack Pills */}
              <div>
                <h4 className="text-xs uppercase tracking-wider font-mono text-gray-400 mb-2">
                  Technologies Utilisées
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-xs font-mono text-[#a3e635]"
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
              <h4 className="text-sm font-bold text-[#a3e635] uppercase font-mono">
                Points Clés du Produit
              </h4>
              <ul className="space-y-3">
                {project.features ? (
                  project.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 bg-[#08140B] p-3.5 rounded-xl border border-[#a3e635]/15 text-sm text-gray-300">
                      <Check className="w-5 h-5 text-[#a3e635] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">Architecture haute performance et UI adaptative.</p>
                )}
              </ul>
            </div>
          )}

          {/* Tab 3: Architecture */}
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-[#a3e635] uppercase font-mono">
                Choix d'Architecture
              </h4>
              <div className="space-y-3">
                {project.architecture ? (
                  project.architecture.map((arch, i) => (
                    <div key={i} className="flex items-center gap-3 bg-[#08140B] p-3.5 rounded-xl border border-[#a3e635]/15 text-sm text-gray-300">
                      <Layers className="w-5 h-5 text-[#a3e635] shrink-0" />
                      <span>{arch}</span>
                    </div>
                  ))
                ) : (
                  <div className="bg-[#08140B] p-4 rounded-xl border border-[#a3e635]/15 text-sm text-gray-300">
                    Développement modulaire selon la méthodologie Clean Code, composants réutilisables et API REST sécurisées.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Footer Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-[#08140B] text-gray-300 border border-[#a3e635]/30 hover:text-white hover:border-[#a3e635] transition-all text-xs font-mono flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>Code Source</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-[#a3e635] text-[#08140B] font-bold text-sm hover:bg-[#bbf246] transition-all cursor-pointer"
            >
              Fermer
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
