'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage } from '@/types';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { backdropVariants, drawerSlideVariants, MOTION_DURATIONS, MOTION_EASE } from '@/lib/motion';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_ai',
      sender: 'assistant',
      text: "Bonjour ! Je suis Aaron AI, l'assistant virtuel dédié d'Aaron Tech (CEO d'AXIUM & Développeur Full-Stack). Que souhaitez-vous savoir sur ses réalisations (Noboté, AXIUMarket), son expertise technique ou planifier une estimation ?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

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
  }, [messages, loading]);

  const quickQuestions = [
    language === 'fr' ? 'Quels sont les projets phares d’Aaron ?' : "What are Aaron's flagship projects?",
    language === 'fr' ? 'Quelle est son expertise technique ?' : 'What is his technical stack?',
    language === 'fr' ? 'Comment obtenir une estimation de devis ?' : 'How can I get a project estimate?',
    language === 'fr' ? 'Quel est son rôle chez AXIUM ?' : 'What is his role at AXIUM?',
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.trim(),
          history: messages.slice(-6).map((m) => ({ role: m.sender, content: m.text })),
        }),
      });

      if (!res.ok) {
        throw new Error(`Assistant API returned HTTP ${res.status}`);
      }

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'assistant',
        text: data.reply || "Désolé, je n'ai pas pu obtenir de réponse. Veuillez réessayer.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Erreur client assistant:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'assistant',
          text: "Une erreur de connexion est survenue. N'hésitez pas à envoyer directement un email à lumooaaron@gmail.com ou à le contacter sur WhatsApp au +243 900 16 36 58.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Subtle Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            variants={drawerSlideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-label="Assistant virtuel Aaron AI Copilot"
            data-lenis-prevent="true"
            className="relative z-10 max-w-md w-full bg-[#08140B] border-l border-white/10 shadow-2xl flex flex-col h-full overscroll-contain"
          >
            {/* Header */}
            <div className="p-4 bg-[#091B0E] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#a3e635] shrink-0 bg-[#08140B]">
                  <Image
                    src={PERSONAL_INFO.avatar}
                    alt="Aaron Tech"
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                    <span>Aaron AI</span>
                    <span className="text-[10px] font-mono bg-[#a3e635] text-[#08140B] px-1.5 py-0.2 rounded font-bold">
                      GEMINI
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400 font-mono block">
                    Copilot Technique • AXIUM Context
                  </span>
                </div>
              </div>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Fermer le copilot AI"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Quick Questions */}
            <div className="p-3 bg-[#091B0E]/80 border-b border-white/5 flex gap-2 overflow-x-auto text-xs no-scrollbar">
              {quickQuestions.map((q, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleSend(q)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className="whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#08140B] border border-white/10 text-gray-300 hover:text-[#a3e635] hover:border-[#a3e635]/40 transition-colors text-xs font-mono cursor-pointer"
                >
                  {q}
                </motion.button>
              ))}
            </div>

            {/* Messages Stream */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
                  className={`flex items-start gap-2.5 ${
                    m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg text-xs shrink-0 ${
                      m.sender === 'user'
                        ? 'bg-[#a3e635] text-[#08140B] font-bold'
                        : 'bg-[#0F2818] text-[#a3e635] border border-white/10'
                    }`}
                  >
                    {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`p-3.5 rounded-2xl max-w-[85%] ${
                      m.sender === 'user'
                        ? 'bg-[#a3e635]/15 border border-[#a3e635]/30 text-white rounded-tr-none'
                        : 'bg-[#091B0E] border border-white/10 text-gray-200 rounded-tl-none'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-line text-xs sm:text-sm">{m.text}</p>
                    <span className="text-[10px] text-gray-500 font-mono mt-1.5 block text-right">
                      {m.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-xs text-[#a3e635] font-mono bg-[#091B0E] p-3 rounded-xl border border-white/10 w-max"
                >
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Génération de la réponse...</span>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#091B0E] border-t border-white/10 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Poser une question technique ou projet..."
                className="flex-1 bg-[#08140B] border border-white/15 focus:border-[#a3e635] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading || !input.trim()}
                aria-label="Envoyer le message"
                className="p-2.5 rounded-xl bg-[#a3e635] text-[#08140B] font-bold disabled:opacity-30 transition-opacity cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
