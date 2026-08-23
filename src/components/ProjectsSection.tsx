import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, FolderGit2, Eye, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';


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

  return (
    <section id="projets" className="py-20 relative z-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-xs font-mono text-[#a3e635] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#a3e635]" />
            <span>{t('projectsBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('projectsSectionTitle')} & <span className="text-[#a3e635]">Projets Phares</span>
          </h2>
          <p className="mt-4 text-gray-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            {t('projectsSectionDesc')}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {filterOptions.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setSelectedFilter(filter.key)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 cursor-pointer ${selectedFilter === filter.key
                ? 'bg-[#a3e635] text-[#08140B] font-bold shadow-lg shadow-[#a3e635]/25 scale-105'
                : 'bg-[#091B0E] text-gray-300 hover:text-white border border-[#a3e635]/20 hover:border-[#a3e635]/50'
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Projects Grid matching reference image layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#091B0E]/90 border border-[#a3e635]/20 hover:border-[#a3e635] rounded-3xl overflow-hidden backdrop-blur-md transition-all duration-300 flex flex-col justify-between group hover:shadow-2xl hover:shadow-[#a3e635]/15 transform hover:-translate-y-1.5"
            >
              <div>
                {/* Image Container with Zoom effect */}
                <div className="relative h-52 w-full bg-[#08140B] overflow-hidden border-b border-[#a3e635]/15">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091B0E] via-transparent to-transparent opacity-80" />
                  
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#08140B]/80 backdrop-blur-md border border-[#a3e635]/40 text-[#a3e635] font-mono text-[11px] font-bold">
                    {project.category}
                  </span>
                </div>

                {/* Content Container */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#a3e635] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-gray-300 line-clamp-3 mb-6 leading-relaxed font-normal">
                    {project.description}
                  </p>

                  {/* Technology Tags Pills matching reference design */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[#0F2818] border border-[#a3e635]/20 text-[11px] font-mono text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer with "Voir" Button matching reference image */}
              <div className="px-6 pb-6 pt-0">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-3 rounded-full bg-[#0F2818] hover:bg-[#a3e635] border border-[#a3e635]/40 hover:border-[#a3e635] text-white hover:text-[#08140B] font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer shadow-md"
                >
                  <Eye className="w-4 h-4 text-[#a3e635] group-hover/btn:text-[#08140B] transition-colors" />
                  <span>{t('viewProjectBtn')}</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover/btn:text-[#08140B] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Modal Detail View */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

      </div>
    </section>
  );
};
