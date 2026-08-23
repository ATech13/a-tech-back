import React, { useState } from 'react';
import { Calculator, X, Sparkles, Check, Loader2, ArrowRight } from 'lucide-react';
import { EstimationResult } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProjectEstimatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectEstimatorModal: React.FC<ProjectEstimatorModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  const { t, language } = useLanguage();
  const [projectType, setProjectType] = useState(language === 'fr' ? 'Application Web Full-Stack' : 'Full-Stack Web Application');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    language === 'fr' ? 'Base de données SQL / NoSQL' : 'SQL / NoSQL Database',
    language === 'fr' ? 'Design Ultra Moderne Responsive' : 'Ultra-Modern Responsive Design',
  ]);
  const [timeline, setTimeline] = useState(language === 'fr' ? 'Standard (3-4 semaines)' : 'Standard (3-4 weeks)');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [estimation, setEstimation] = useState<EstimationResult | null>(null);

  if (!isOpen) return null;

  const projectTypeOptions = language === 'fr' ? [
    'Application Web Full-Stack',
    'Site Vitrine & Corporate',
    'Plateforme E-Commerce / SaaS',
    'Application Mobile & PWA',
    'Plateforme de Vote / Temps Réel',
  ] : [
    'Full-Stack Web Application',
    'Corporate & Showcase Website',
    'E-Commerce Platform / SaaS',
    'Mobile Application & PWA',
    'Real-Time & Voting Platform',
  ];

  const featureOptions = language === 'fr' ? [
    'Authentification & Rôles Utilisateurs',
    'Base de données SQL / NoSQL',
    'Intégration AI (Gemini / LLM)',
    'Paiement Mobile Money / Stripe',
    'Tableau de bord Analytics & Charts',
    'Live WebSockets & Notifications',
    'Design Ultra Moderne Responsive',
  ] : [
    'Authentication & User Roles',
    'SQL / NoSQL Database',
    'AI Integration (Gemini / LLM)',
    'Payment Gateway (Mobile Money / Stripe)',
    'Analytics Dashboard & Charts',
    'Live WebSockets & Real-Time Alerts',
    'Ultra-Modern Responsive Design',
  ];

  const timelineOptions = language === 'fr' ? [
    'Urgent (< 2 semaines)',
    'Standard (3-4 semaines)',
    'Approfondi (1-2 mois)',
  ] : [
    'Urgent (< 2 weeks)',
    'Standard (3-4 weeks)',
    'Deep-dive (1-2 months)',
  ];

  const toggleFeature = (feat: string) => {
    if (selectedFeatures.includes(feat)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feat));
    } else {
      setSelectedFeatures([...selectedFeatures, feat]);
    }
  };

  const handleEstimate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectType,
          features: selectedFeatures,
          timeline,
          description,
          language,
        }),
      });

      const data = await res.json();
      if (data.estimation) {
        setEstimation(data.estimation);
      } else {
        setEstimation({
          estimatedTimeframe: timeline.includes('Urgent') ? (language === 'fr' ? '1 à 2 semaines' : '1 to 2 weeks') : (language === 'fr' ? '3 à 4 semaines' : '3 to 4 weeks'),
          complexityLevel: selectedFeatures.length > 4 ? (language === 'fr' ? 'Élevée (Scalable)' : 'High (Scalable)') : (language === 'fr' ? 'Modérée (Production-Ready)' : 'Moderate (Production-Ready)'),
          recommendedStack: ['React / Next.js', 'Node.js Express / NestJS', 'PostgreSQL / Supabase', 'Tailwind CSS'],
          summary: language === 'fr'
            ? `Projet estimé avec architecture modulaire pour ${projectType}. Déploiement optimisé avec CI/CD.`
            : `Estimated project with modular architecture for ${projectType}. Production-grade CI/CD deployment.`,
        });
      }
    } catch (err) {
      console.error(err);
      setEstimation({
        estimatedTimeframe: timeline.includes('Urgent') ? '1 - 2 weeks' : '3 - 4 weeks',
        complexityLevel: 'Modérée à Élevée',
        recommendedStack: ['React / Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
        summary: language === 'fr'
          ? "Architecture moderne adaptée aux exigences de performance et d'ergonomie."
          : "Modern architecture tailored to high-performance and fluid UX requirements.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-6 flex min-h-full items-center justify-center animate-fadeIn">
      <div className="bg-[#091B0E] border border-[#a3e635]/40 rounded-3xl max-w-2xl w-full shadow-2xl relative my-auto text-white overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col">

        {/* Modal Header */}
        <div className="p-6 bg-[#08140B] border-b border-[#a3e635]/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#0F2818] border border-[#a3e635] text-[#a3e635]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{t('estimatorTitle')}</h2>
              <span className="text-xs font-mono text-[#a3e635]">
                {language === 'fr' ? 'Simulation intelligente & devis' : 'Smart feasibility simulation & quote'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm">
          
          <p className="text-xs text-gray-300">
            {t('estimatorSubtitle')}
          </p>

          {/* 1. Project Type */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">
              1. {t('projectTypeLabel')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {projectTypeOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setProjectType(type)}
                  className={`p-3 rounded-xl text-left text-xs font-medium border transition-all cursor-pointer ${
                    projectType === type
                      ? 'bg-[#0F2818] border-[#a3e635] text-[#a3e635] font-bold'
                      : 'bg-[#08140B] border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Desired Features */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">
              2. {t('featuresLabel')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {featureOptions.map((feat) => {
                const isSelected = selectedFeatures.includes(feat);
                return (
                  <button
                    key={feat}
                    type="button"
                    onClick={() => toggleFeature(feat)}
                    className={`p-3 rounded-xl text-left text-xs border flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#0F2818] border-[#a3e635] text-white font-medium'
                        : 'bg-[#08140B] border-white/10 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <span>{feat}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#a3e635] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Desired Timeline */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">
              3. {t('timelineLabel')}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timelineOptions.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setTimeline(time)}
                  className={`p-3 rounded-xl text-center text-xs border transition-all cursor-pointer ${
                    timeline === time
                      ? 'bg-[#0F2818] border-[#a3e635] text-[#a3e635] font-bold'
                      : 'bg-[#08140B] border-white/10 text-gray-300 hover:border-white/30'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Description */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">
              4. {t('descriptionLabel')}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('descriptionPlaceholder')}
              className="w-full px-4 py-3 rounded-xl bg-[#08140B] border border-[#a3e635]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#a3e635] text-xs resize-none"
            />
          </div>

          {/* Estimation Results Panel */}
          {estimation && (
            <div className="p-5 rounded-2xl bg-[#08140B] border-2 border-[#a3e635] space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 text-[#a3e635] font-bold text-base">
                <Sparkles className="w-5 h-5" />
                <span>{t('estimationResultTitle')}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#0F2818] border border-[#a3e635]/30">
                  <span className="text-gray-400 block font-mono mb-1">{t('timeframeLabel')}</span>
                  <strong className="text-white text-sm">{estimation.estimatedTimeframe}</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#0F2818] border border-[#a3e635]/30">
                  <span className="text-gray-400 block font-mono mb-1">{t('complexityLabel')}</span>
                  <strong className="text-[#a3e635] text-sm">{estimation.complexityLevel}</strong>
                </div>
              </div>

              <div>
                <span className="text-xs text-gray-400 block font-mono mb-2">
                  {t('recommendedStackLabel')}
                </span>
                <div className="flex flex-wrap gap-2">
                  {estimation.recommendedStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-[#0F2818] border border-[#a3e635]/40 text-[#a3e635] text-xs font-mono font-bold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed border-t border-white/10 pt-3">
                {estimation.summary}
              </p>

              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="w-full py-3 rounded-xl bg-[#a3e635] text-[#08140B] font-bold text-xs hover:bg-[#bbf246] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>{t('discussProjectBtn')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        {!estimation && (
          <div className="p-4 sm:p-6 bg-[#08140B] border-t border-[#a3e635]/20 flex items-center justify-end gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-gray-400 hover:text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              onClick={handleEstimate}
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#a3e635] text-[#08140B] font-bold text-xs hover:bg-[#bbf246] transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t('calculatingBtn')}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t('calculateBtn')}</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
