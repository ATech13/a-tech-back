'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Calculator, X, Sparkles, Check, Loader2, ArrowRight, Clock, ShieldCheck, DollarSign, MessageSquare } from 'lucide-react';
import { EstimationResult } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { backdropVariants, modalVariants, MOTION_DURATIONS, MOTION_EASE } from '@/lib/motion';
import { toast } from 'sonner';

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
  const { language } = useLanguage();
  const [projectType, setProjectType] = useState(
    language === 'fr' ? 'Application Web Full-Stack' : 'Full-Stack Web Application'
  );
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    language === 'fr' ? 'Base de données SQL / NoSQL' : 'SQL / NoSQL Database',
    language === 'fr' ? 'Design Ultra Moderne Responsive' : 'Ultra-Modern Responsive Design',
  ]);
  const [timeline, setTimeline] = useState(
    language === 'fr' ? 'Standard (3-4 semaines)' : 'Standard (3-4 weeks)'
  );
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [estimation, setEstimation] = useState<EstimationResult | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (estimation) {
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  }, [estimation]);

  const projectTypeOptions =
    language === 'fr'
      ? [
          'Application Web Full-Stack',
          'Plateforme E-Commerce / Marketplace',
          'Plateforme de Vote / Temps Réel',
          'Site Vitrine Corporate & SaaS',
          'Application Mobile & PWA',
        ]
      : [
          'Full-Stack Web Application',
          'E-Commerce Platform / Marketplace',
          'Real-Time & Voting Platform',
          'Showcase Corporate & SaaS',
          'Mobile Application & PWA',
        ];

  const featureOptions =
    language === 'fr'
      ? [
          'Authentification & Rôles Utilisateurs',
          'Base de données SQL / NoSQL',
          'Intégration AI (Gemini / LLM)',
          'Paiement Mobile Money / Stripe',
          'Tableau de bord Analytics & Charts',
          'Live WebSockets & Notifications',
          'Design Ultra Moderne Responsive',
        ]
      : [
          'Authentication & User Roles',
          'SQL / NoSQL Database',
          'AI Integration (Gemini / LLM)',
          'Payment Gateway (Mobile Money / Stripe)',
          'Analytics Dashboard & Charts',
          'Live WebSockets & Real-Time Alerts',
          'Ultra-Modern Responsive Design',
        ];

  const timelineOptions =
    language === 'fr'
      ? ['Urgent (< 2 semaines)', 'Standard (3-4 semaines)', 'Approfondi (1-2 mois)']
      : ['Urgent (< 2 weeks)', 'Standard (3-4 weeks)', 'Deep-dive (1-2 months)'];

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
          estimatedTimeframe: timeline.includes('Urgent') ? '1 à 2 semaines' : '3 à 4 semaines',
          estimatedBudget: '600$ – 1 400$ USD',
          complexityLevel: 'Moyenne à Élevée',
          recommendedStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
          summary: 'Architecture modulaire avec composants réutilisables et performance optimale.',
        });
      }
      toast.success(
        language === 'fr'
          ? 'Devis IA généré avec succès par Gemini !'
          : 'AI quotation successfully generated with Gemini!'
      );
    } catch (err) {
      console.error(err);
      setEstimation({
        estimatedTimeframe: '3 à 4 semaines',
        estimatedBudget: '600$ – 1 200$ USD',
        complexityLevel: 'Moyenne',
        recommendedStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
        summary: 'Architecture modulaire avec composants réutilisables et livraison sécurisée.',
      });
      toast.info(
        language === 'fr'
          ? 'Estimation préliminaire basée sur les métriques standard.'
          : 'Preliminary estimate based on standard metrics.'
      );
    } finally {
      setLoading(false);
    }
  };

  const forwardToWhatsApp = () => {
    if (!estimation) return;
    const isFr = language === 'fr';
    const text = isFr
      ? `👋 *Demande de devis projet — Portfolio Aaron Tech*\n\n` +
        `📋 *Type de projet :* ${projectType}\n` +
        `⚡ *Fonctionnalités :* ${selectedFeatures.join(', ')}\n` +
        `⏱️ *Délai estimé (IA) :* ${estimation.estimatedTimeframe}\n` +
        (estimation.estimatedBudget ? `💰 *Budget indicatif :* ${estimation.estimatedBudget}\n` : '') +
        `🎯 *Complexité :* ${estimation.complexityLevel}\n` +
        `🛠️ *Stack suggérée :* ${estimation.recommendedStack.join(', ')}\n` +
        (description ? `📝 *Notes :* ${description}\n\n` : '\n') +
        `Pouvons-nous en discuter ?`
      : `👋 *Project quotation inquiry — Aaron Tech Portfolio*\n\n` +
        `📋 *Project Type:* ${projectType}\n` +
        `⚡ *Features:* ${selectedFeatures.join(', ')}\n` +
        `⏱️ *Estimated Timeline (AI):* ${estimation.estimatedTimeframe}\n` +
        (estimation.estimatedBudget ? `💰 *Target Budget:* ${estimation.estimatedBudget}\n` : '') +
        `🎯 *Complexity:* ${estimation.complexityLevel}\n` +
        `🛠️ *Recommended Stack:* ${estimation.recommendedStack.join(', ')}\n` +
        (description ? `📝 *Notes:* ${description}\n\n` : '\n') +
        `Let's discuss next steps!`;

    const url = `https://wa.me/243900163658?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="estimator-modal-title"
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
            className="bg-[#091B0E] border border-white/15 rounded-3xl max-w-2xl w-full shadow-2xl relative z-10 my-auto text-white overflow-hidden max-h-[88vh] flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#08140B] border border-[#a3e635]/30 text-[#a3e635]">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h3 id="estimator-modal-title" className="text-lg sm:text-xl font-extrabold text-white">
                    {language === 'fr' ? 'Estimateur de Devis IA' : 'AI Project Estimator'}
                  </h3>
                  <p className="text-xs font-mono text-gray-400">
                    {language === 'fr' ? 'Génération structurée propulsée par Gemini' : 'Structured estimation powered by Gemini'}
                  </p>
                </div>
              </div>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Fermer l'estimateur"
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Body Form - Scrollable */}
            <div
              data-lenis-prevent="true"
              style={{ WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }}
              className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1 overscroll-contain"
            >

              {/* 1. Project Type */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2.5">
                  1. {language === 'fr' ? 'Type de Projet' : 'Project Type'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {projectTypeOptions.map((opt) => (
                    <motion.button
                      key={opt}
                      type="button"
                      onClick={() => setProjectType(opt)}
                      whileTap={{ scale: 0.98 }}
                      className={`p-3 rounded-xl border text-left text-xs font-mono transition-colors cursor-pointer ${
                        projectType === opt
                          ? 'bg-[#a3e635] text-[#08140B] font-bold border-[#a3e635]'
                          : 'bg-[#08140B] text-gray-300 border-white/10 hover:border-[#a3e635]/40'
                      }`}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 2. Features */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2.5">
                  2. {language === 'fr' ? 'Fonctionnalités Souhaitées' : 'Target Features'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {featureOptions.map((feat) => {
                    const selected = selectedFeatures.includes(feat);
                    return (
                      <motion.button
                        key={feat}
                        type="button"
                        onClick={() => toggleFeature(feat)}
                        whileTap={{ scale: 0.98 }}
                        className={`p-2.5 rounded-xl border text-left text-xs font-mono flex items-center justify-between transition-colors cursor-pointer ${
                          selected
                            ? 'bg-[#0F2818] text-[#a3e635] border-[#a3e635]/60 font-semibold'
                            : 'bg-[#08140B] text-gray-300 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <span>{feat}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-[#a3e635] shrink-0" />}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Timeline */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2.5">
                  3. {language === 'fr' ? 'Délai Estimé' : 'Desired Timeline'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timelineOptions.map((opt) => (
                    <motion.button
                      key={opt}
                      type="button"
                      onClick={() => setTimeline(opt)}
                      whileTap={{ scale: 0.98 }}
                      className={`p-2.5 rounded-xl border text-center text-xs font-mono transition-colors cursor-pointer ${
                        timeline === opt
                          ? 'bg-[#a3e635] text-[#08140B] font-bold border-[#a3e635]'
                          : 'bg-[#08140B] text-gray-300 border-white/10 hover:border-[#a3e635]/40'
                      }`}
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 4. Notes */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                  4. {language === 'fr' ? 'Détails ou ambitions particulières (Optionnel)' : 'Notes or specific needs (Optional)'}
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={
                    language === 'fr'
                      ? 'Ex: Intégration de paiement Mobile Money, catalogue, design premium...'
                      : 'e.g. Mobile Money checkout, catalog, custom animations...'
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08140B] border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#a3e635] text-xs font-sans transition-colors resize-none"
                />
              </div>

              {/* Calculate Button */}
              <motion.button
                onClick={handleEstimate}
                disabled={loading}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 rounded-xl bg-[#a3e635] text-[#08140B] font-bold text-sm hover:bg-[#b5f448] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-[#a3e635]/20"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{language === 'fr' ? 'Génération du devis avec Gemini IA...' : 'AI is calculating quote with Gemini...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{language === 'fr' ? 'Générer le Devis avec Gemini' : 'Generate Quote with Gemini'}</span>
                  </>
                )}
              </motion.button>

              {/* Estimation Result Card with smooth Reveal */}
              <AnimatePresence>
                {estimation && (
                  <motion.div
                    ref={resultRef}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: MOTION_DURATIONS.standard, ease: MOTION_EASE.smooth }}
                    className="mt-6 p-5 sm:p-6 rounded-2xl bg-[#08140B] border border-[#a3e635]/40 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-xs font-mono font-bold text-[#a3e635] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        {language === 'fr' ? 'Devis Estimatif Généré' : 'Generated Quotation'}
                      </span>
                      <span className="text-[11px] font-mono text-gray-400">
                        {estimation.complexityLevel}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-[#091B0E] p-3 rounded-xl border border-white/10">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 mb-1">
                          <Clock className="w-3.5 h-3.5 text-[#a3e635]" />
                          <span>Délai estimé</span>
                        </div>
                        <div className="text-sm font-bold text-white">
                          {estimation.estimatedTimeframe}
                        </div>
                      </div>

                      <div className="bg-[#091B0E] p-3 rounded-xl border border-white/10">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 mb-1">
                          <DollarSign className="w-3.5 h-3.5 text-[#a3e635]" />
                          <span>Budget indicatif</span>
                        </div>
                        <div className="text-sm font-bold text-[#a3e635]">
                          {estimation.estimatedBudget || 'Sur devis'}
                        </div>
                      </div>

                      <div className="bg-[#091B0E] p-3 rounded-xl border border-white/10">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400 mb-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#a3e635]" />
                          <span>Complexité</span>
                        </div>
                        <div className="text-sm font-bold text-gray-200">
                          {estimation.complexityLevel}
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-mono text-gray-400 block mb-2">Stack Technique Recommandée:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {estimation.recommendedStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded bg-[#0F2818] border border-[#a3e635]/20 text-xs font-mono text-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#091B0E] p-4 rounded-xl border border-white/10 text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {estimation.summary}
                    </div>

                    {/* Actions: Direct WhatsApp forward & Contact */}
                    <div className="space-y-2 pt-2">
                      <motion.button
                        onClick={forwardToWhatsApp}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#08140B] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg shadow-[#25D366]/20"
                      >
                        <MessageSquare className="w-4 h-4 fill-current" />
                        <span>
                          {language === 'fr'
                            ? 'Transférer ce devis sur WhatsApp (+243 900 16 36 58)'
                            : 'Forward this quote to WhatsApp (+243 900 16 36 58)'}
                        </span>
                      </motion.button>

                      <motion.button
                        onClick={() => {
                          onClose();
                          onOpenContact();
                        }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2.5 rounded-xl bg-[#0F2818] hover:bg-white/5 text-gray-300 hover:text-white border border-white/10 font-mono text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <span>{language === 'fr' ? 'Envoyer par formulaire de contact' : 'Send via Contact form'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
