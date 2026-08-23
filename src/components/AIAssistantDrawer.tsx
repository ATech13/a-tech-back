import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, Loader2, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

const API_BASE_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({ isOpen, onClose }) => {
  const { t, personalInfo, language } = useLanguage();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_ai',
      sender: 'assistant',
      text: 'Bonjour ! Je suis "Aaron AI", l\'assistant virtuel dédié d\'Aaron Tech (CEO & Cofondateur d\'AXIUM). Que souhaitez-vous savoir sur son parcours, ses projets ou ses tarifs ?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // Update welcome message if language changes and only welcome message exists
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].id === 'welcome_ai') {
        return [
          {
            id: 'welcome_ai',
            sender: 'assistant',
            text: t('aiWelcomeMessage'),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ];
      }
      return prev;
    });
  }, [language, t]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const quickQuestions = [
    t('aiQ1'),
    t('aiQ2'),
    t('aiQ3'),
    t('aiQ4'),
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai-assistant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
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
        text: data.reply || "Aie, je n'ai pas pu obtenir de réponse. Veuillez réessayer.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'assistant',
          text: "Une erreur de connexion est survenue. N'hésitez pas à envoyer directement un email à lumooaaron@gmail.com.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 max-w-md w-full bg-[#08140B] border-l border-[#a3e635]/30 shadow-2xl flex flex-col animate-slideLeft">
      
      {/* Header */}
      <div className="p-4 bg-[#091B0E] border-b border-[#a3e635]/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#a3e635] shrink-0">
            <img src={PERSONAL_INFO.avatar} alt="Aaron Tech" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-base">Aaron <span className='text-[#aee51a]'>AI</span> Copilot</h3>
              {/* <div className="font-bold text-2xl">
                A<span className="font-light text-[#aee51a]">TECH</span>
              </div> */}
            </div>
            <span className="text-xs text-[#a3e635] font-mono flex items-center gap-1">
              Entrainée sur ATech's Data
            </span>
          </div>
        </div>

        <button onClick={onClose} className="p-2 text-gray-400 hover:text-white cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Quick Question Chips */}
      <div className="p-3 bg-[#091B0E]/60 border-b border-white/5 flex gap-2 overflow-x-auto text-xs no-scrollbar">
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#0F2818] border border-[#a3e635]/20 text-gray-300 hover:text-[#a3e635] hover:border-[#a3e635] transition-all cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Stream Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-sm">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex items-start gap-2.5 ${
              m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <div
              className={`p-2 rounded-xl text-xs shrink-0 ${
                m.sender === 'user'
                  ? 'bg-[#a3e635] text-[#08140B] font-bold'
                  : 'bg-[#0F2818] text-[#a3e635] border border-[#a3e635]/30'
              }`}
            >
              {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div
              className={`p-3.5 rounded-2xl max-w-[80%] ${
                m.sender === 'user'
                  ? 'bg-[#a3e635]/15 border border-[#a3e635]/40 text-white rounded-tr-none'
                  : 'bg-[#091B0E] border border-white/10 text-gray-200 rounded-tl-none'
              }`}
            >
              <p className="leading-relaxed whitespace-pre-line text-xs sm:text-sm">{m.text}</p>
              <span className="text-[10px] text-gray-500 font-mono mt-1 block text-right">
                {m.timestamp}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#a3e635] font-mono bg-[#091B0E] p-3 rounded-2xl border border-[#a3e635]/20 w-max">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Aaron AI réfléchit...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-[#091B0E] border-t border-[#a3e635]/20 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Posez une question à Aaron AI..."
          className="flex-1 bg-[#08140B] border border-[#a3e635]/20 focus:border-[#a3e635] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2.5 rounded-xl bg-[#a3e635] text-[#08140B] font-bold disabled:opacity-40 cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
