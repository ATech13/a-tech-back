'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { backdropVariants, modalVariants } from '@/lib/motion';
import { toast } from 'sonner';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAI: () => void;
  onOpenEstimator: () => void;
}

interface TerminalLog {
  id: string;
  command?: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  isOpen,
  onClose,
  onOpenAI,
  onOpenEstimator,
}) => {
  const { language, personalInfo, skills, projects } = useLanguage();
  const [input, setInput] = useState('');
  const [expanded, setExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const getWelcomeLog = (): TerminalLog => ({
    id: 'welcome',
    output: (
      <div className="text-gray-300 space-y-1">
        <p className="text-[#a3e635] font-bold">
          {language === 'fr' ? 'Bienvenue sur Aaron Tech CLI v2.5.0' : 'Welcome to Aaron Tech CLI v2.5.0'}
        </p>
        <p className="text-xs text-gray-400">
          {language === 'fr' ? (
            <>Tapez <span className="text-amber-400 font-bold font-mono">help</span> pour afficher la liste des commandes disponibles.</>
          ) : (
            <>Type <span className="text-amber-400 font-bold font-mono">help</span> to view all available commands.</>
          )}
        </p>
      </div>
    ),
  });

  const [logs, setLogs] = useState<TerminalLog[]>([getWelcomeLog()]);

  useEffect(() => {
    setLogs((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome') {
        return [getWelcomeLog()];
      }
      return prev;
    });
  }, [language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let outputNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-[#a3e635] font-bold">
              {language === 'fr' ? 'Commandes disponibles :' : 'Available commands:'}
            </p>
            <p>
              <span className="text-amber-400 font-mono w-28 inline-block">about</span> :{' '}
              {language === 'fr' ? "À propos d'Aaron Tech & AXIUM" : 'About Aaron Tech & AXIUM leadership'}
            </p>
            <p>
              <span className="text-amber-400 font-mono w-28 inline-block">skills</span> :{' '}
              {language === 'fr' ? 'Liste des compétences & niveaux' : 'List of skills & mastery levels'}
            </p>
            <p>
              <span className="text-amber-400 font-mono w-28 inline-block">projects</span> :{' '}
              {language === 'fr' ? 'Projets livrés & accomplissements' : 'Shipped projects & key accomplishments'}
            </p>
            <p>
              <span className="text-amber-400 font-mono w-28 inline-block">contact</span> :{' '}
              {language === 'fr' ? 'Email, téléphone & localisation' : 'Email, phone number & location'}
            </p>
            <p>
              <span className="text-amber-400 font-mono w-28 inline-block">ai</span> :{' '}
              {language === 'fr' ? 'Poser une question à Aaron AI (Gemini)' : 'Ask questions to Aaron AI (Gemini Copilot)'}
            </p>
            <p>
              <span className="text-amber-400 font-mono w-28 inline-block">estimate</span> :{' '}
              {language === 'fr' ? 'Calculateur de devis projet' : 'Launch smart project cost & stack estimator'}
            </p>
            <p>
              <span className="text-amber-400 font-mono w-28 inline-block">clear</span> :{' '}
              {language === 'fr' ? "Effacer l'écran du terminal" : 'Clear terminal output'}
            </p>
            <p>
              <span className="text-amber-400 font-mono w-28 inline-block">sudo hire</span> :{' '}
              {language === 'fr' ? 'Initier un recrutement direct' : 'Direct hire fast-track proposal'}
            </p>
          </div>
        );
        break;

      case 'about':
      case 'whoami':
        outputNode = (
          <div className="space-y-1.5 text-xs text-gray-300">
            <p className="text-[#a3e635] font-bold">{personalInfo.fullName} ({personalInfo.name})</p>
            <p className="text-white font-medium">{personalInfo.title}</p>
            <p className="text-gray-400 italic">"{personalInfo.quote}"</p>
            <p className="text-gray-300 text-[11px] leading-relaxed pt-1">{personalInfo.bio}</p>
          </div>
        );
        break;

      case 'skills':
      case 'stack':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-[#a3e635] font-bold">
              {language === 'fr' ? 'Compétences Techniques Principales :' : 'Core Technical Stack & Skills:'}
            </p>
            {skills.slice(0, 8).map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="w-28 text-gray-300 font-mono truncate">{s.name}</span>
                <div className="w-32 bg-[#08140B] h-2 rounded-full overflow-hidden border border-[#a3e635]/30">
                  <div className="bg-[#a3e635] h-full" style={{ width: `${s.level}%` }} />
                </div>
                <span className="text-[#a3e635] font-mono">{s.level}%</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="text-[#a3e635] font-bold">
              {language === 'fr' ? 'Projets Récents :' : 'Recent Key Projects:'}
            </p>
            {projects.map((p) => (
              <div key={p.id} className="border-l-2 border-[#a3e635]/40 pl-2.5 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-white font-bold">{p.title}</span>
                  <span className="text-[10px] text-[#a3e635] font-mono bg-[#0F2818] px-1.5 py-0.2 rounded">
                    {p.category}
                  </span>
                </div>
                <p className="text-gray-400 text-[11px]">{p.subtitle || p.description}</p>
                <div className="text-[10px] text-gray-400 font-mono">
                  Stack: <span className="text-[#a3e635]">{p.tags.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs text-gray-300">
            <p>📧 Email: <a href={`mailto:${personalInfo.email}`} className="text-[#a3e635] underline">{personalInfo.email}</a></p>
            <p>📞 {language === 'fr' ? 'Téléphone & WhatsApp' : 'Phone & WhatsApp'}: <span className="text-[#a3e635] font-mono">{personalInfo.phone}</span></p>
            <p>📍 {language === 'fr' ? 'Localisation' : 'Location'}: <span className="text-[#a3e635]">{personalInfo.location}</span></p>
            <p>🌐 GitHub: <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" className="text-[#a3e635] underline">{personalInfo.socials.github}</a></p>
          </div>
        );
        break;

      case 'ai':
        outputNode = (
          <p className="text-[#a3e635] text-xs">
            {language === 'fr' ? "Ouverture de l'assistant Aaron AI en cours..." : 'Opening Aaron AI Copilot...'}
          </p>
        );
        setTimeout(() => onOpenAI(), 300);
        break;

      case 'estimate':
        outputNode = (
          <p className="text-[#a3e635] text-xs">
            {language === 'fr' ? 'Lancement du module de devis...' : 'Opening Project Estimator...'}
          </p>
        );
        setTimeout(() => onOpenEstimator(), 300);
        break;

      case 'sudo hire':
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        toast.success(language === 'fr' ? '🎉 Accès prioritaire accordé !' : '🎉 Fast-track priority granted!');
        outputNode = (
          <div className="bg-[#0F2818] p-3.5 rounded-xl border border-[#a3e635] text-xs text-[#a3e635] space-y-1.5">
            <p className="font-bold text-white">
              {language === 'fr' ? '🎉 Accès privilégié accordé !' : '🎉 Fast-track hiring priority granted!'}
            </p>
            <p className="text-gray-200">
              {language === 'fr'
                ? `Merci de votre intérêt. Contactez Aaron directement par email (${personalInfo.email}) ou via WhatsApp (${personalInfo.phone}) pour planifier un entretien ou discuter d'un contrat.`
                : `Thank you for reaching out! Contact Aaron directly by email (${personalInfo.email}) or WhatsApp (${personalInfo.phone}) to schedule an interview or discuss a project engagement.`}
            </p>
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        setInput('');
        return;

      default:
        outputNode = (
          <p className="text-red-400 text-xs">
            {language === 'fr' ? (
              <>Commande inconnue: <span className="font-mono text-white">"{trimmed}"</span>. Tapez <span className="text-[#a3e635] font-bold font-mono">help</span> pour voir les commandes valides.</>
            ) : (
              <>Unknown command: <span className="font-mono text-white">"{trimmed}"</span>. Type <span className="text-[#a3e635] font-bold font-mono">help</span> for valid commands.</>
            )}
          </p>
        );
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `log_${Date.now()}`,
        command: cmdStr,
        output: outputNode,
      },
    ]);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div data-lenis-prevent="true" className="fixed inset-0 z-50 overflow-y-auto p-2 sm:p-4 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Terminal Window */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            data-lenis-prevent="true"
            className={`bg-[#08140B] border border-white/15 rounded-2xl shadow-2xl flex flex-col transition-all duration-300 relative z-10 my-auto ${
              expanded ? 'w-full h-[95vh]' : 'max-w-2xl w-full h-[85vh] sm:h-[540px]'
            }`}
          >
            {/* Terminal Titlebar */}
            <div className="bg-[#091B0E] px-4 py-3 border-b border-white/10 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 inline-block" />
                <span className="text-xs font-mono text-gray-300 ml-2 flex items-center gap-1.5">
                  <TerminalIcon className="w-3.5 h-3.5 text-[#a3e635]" /> aaron-tech-cli
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <motion.button
                  onClick={() => setExpanded(!expanded)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Agrandir ou réduire le terminal"
                  className="p-1 hover:text-white cursor-pointer"
                >
                  {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </motion.button>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Fermer le terminal"
                  className="p-1 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Terminal Logs Area */}
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="space-y-1">
                  {log.command && (
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <span className="text-[#a3e635] font-bold">$</span>
                      <span>{log.command}</span>
                    </div>
                  )}
                  <div>{log.output}</div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Terminal Prompt Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCommand(input);
              }}
              className="bg-[#091B0E] p-3 border-t border-white/10 flex items-center gap-2 rounded-b-2xl"
            >
              <span className="text-[#a3e635] font-mono text-sm font-bold">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  language === 'fr'
                    ? "Tapez 'help', 'about', 'skills', 'projects', 'sudo hire'..."
                    : "Type 'help', 'about', 'skills', 'projects', 'sudo hire'..."
                }
                className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
                autoFocus
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className="px-3.5 py-1.5 rounded-lg bg-[#a3e635] hover:bg-[#bbf246] text-[#08140B] font-mono text-xs font-bold cursor-pointer transition-colors"
              >
                Exec
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
