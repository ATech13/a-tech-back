'use client';
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Instagram, Twitter, MessageSquare, Loader2, ExternalLink, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { MOTION_DURATIONS, MOTION_EASE } from '@/lib/motion';
import { toast } from 'sonner';

export const ContactSection: React.FC = () => {
  const { t, personalInfo, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const WHATSAPP_NUMBER = '243900163658';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    toast.success(`${fieldName} copié dans le presse-papier !`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg(t('formFillAll'));
      toast.error(t('formFillAll'));
      return;
    }

    setLoading(true);

    const whatsappMessage = language === 'fr'
      ? `👋 *Nouveau message depuis le Portfolio Aaron Tech*\n\n👤 *Nom :* ${formData.name.trim()}\n📧 *Email :* ${formData.email.trim()}\n\n📝 *Message :*\n${formData.message.trim()}\n\n---`
      : `👋 *New inquiry from Aaron Tech Portfolio*\n\n👤 *Name:* ${formData.name.trim()}\n📧 *Email:* ${formData.email.trim()}\n\n📝 *Message:*\n${formData.message.trim()}\n\n---`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    setLastWhatsappUrl(whatsappUrl);

    try {
      // 1. Post to Next.js Route Handler
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, whatsappForwarded: true, targetPhone: WHATSAPP_NUMBER }),
      }).catch((err) => console.log('Contact server logging error:', err));

      // 2. Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a3e635', '#84cc16', '#4ade80', '#ffffff'],
      });

      // 3. Mark form as submitted & clear inputs
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      toast.success(
        language === 'fr'
          ? 'Message envoyé ! Redirection vers WhatsApp...'
          : 'Message sent! Redirecting to WhatsApp...'
      );

      // 4. Open WhatsApp
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }, 700);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacts" className="py-24 relative z-10 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: MOTION_DURATIONS.section, ease: MOTION_EASE.smooth }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-xs font-mono text-[#a3e635] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#a3e635]" />
            <span>{t('contactBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t('contactSectionTitle')} <span className="text-[#a3e635]">{t('contactSectionHighlight')}</span>
          </h2>
        </motion.div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Side: Contact Cards & Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: MOTION_DURATIONS.section, ease: MOTION_EASE.smooth }}
            className="lg:col-span-5 space-y-5"
          >
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {t('contactIntroText')}
            </p>

            {/* Email Card with Quick Copy */}
            <div className="flex items-center justify-between bg-[#091B0E] border border-white/10 hover:border-[#a3e635]/60 p-4 sm:p-5 rounded-2xl transition-all group">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 flex-1"
              >
                <div className="p-3 rounded-xl bg-[#08140B] border border-white/15 text-[#a3e635] group-hover:bg-[#a3e635] group-hover:text-[#08140B] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-400 block">Email Professionnel</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#a3e635] transition-colors">
                    {personalInfo.email}
                  </span>
                </div>
              </a>

              <motion.button
                type="button"
                onClick={() => copyToClipboard(personalInfo.email, 'Email')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Copier l'email"
                className="p-2 rounded-lg text-gray-400 hover:text-[#a3e635] hover:bg-white/5 transition-colors cursor-pointer"
              >
                {copiedField === 'Email' ? <Check className="w-4 h-4 text-[#a3e635]" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            </div>

            {/* WhatsApp / Phone Card with Quick Copy */}
            <div className="flex items-center justify-between bg-[#091B0E] border border-white/10 hover:border-[#a3e635]/60 p-4 sm:p-5 rounded-2xl transition-all group">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 flex-1"
              >
                <div className="p-3 rounded-xl bg-[#08140B] border border-white/15 text-[#a3e635] group-hover:bg-[#a3e635] group-hover:text-[#08140B] transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-gray-400 block">WhatsApp & Téléphone Direct</span>
                  <span className="text-sm font-bold text-white group-hover:text-[#a3e635] transition-colors">
                    +243 900 16 36 58
                  </span>
                </div>
              </a>

              <motion.button
                type="button"
                onClick={() => copyToClipboard('+243 900 16 36 58', 'Numéro WhatsApp')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Copier le numéro WhatsApp"
                className="p-2 rounded-lg text-gray-400 hover:text-[#a3e635] hover:bg-white/5 transition-colors cursor-pointer"
              >
                {copiedField === 'Numéro WhatsApp' ? <Check className="w-4 h-4 text-[#a3e635]" /> : <Copy className="w-4 h-4" />}
              </motion.button>
            </div>

            {/* Location Card */}
            <div className="flex items-center gap-4 bg-[#091B0E] border border-white/10 p-4 sm:p-5 rounded-2xl">
              <div className="p-3 rounded-xl bg-[#08140B] border border-white/15 text-[#a3e635]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-gray-400 block">{t('basedIn')}</span>
                <span className="text-sm font-bold text-white">
                  {personalInfo.location}
                </span>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-2">
              <span className="text-xs font-mono text-gray-400 block mb-3 uppercase tracking-wider">
                Profils & Présence en Ligne
              </span>
              <div className="flex items-center gap-2.5">
                <motion.a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-[#091B0E] border border-white/10 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-[#091B0E] border border-white/10 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={personalInfo.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-[#091B0E] border border-white/10 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-colors"
                  aria-label="X / Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-[#091B0E] border border-white/10 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-4 h-4" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: MOTION_DURATIONS.section, delay: 0.1, ease: MOTION_EASE.smooth }}
            className="lg:col-span-7"
          >
            <div className="bg-[#091B0E] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: MOTION_DURATIONS.standard, ease: MOTION_EASE.smooth }}
                    className="py-8 text-center space-y-5"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#a3e635]/15 text-[#a3e635] flex items-center justify-center mx-auto border border-[#a3e635]">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {t('formSuccessTitle')}
                    </h3>
                    <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                      {t('formSuccessDesc')}
                    </p>

                    {lastWhatsappUrl && (
                      <div className="pt-2 flex flex-col items-center gap-3">
                        <motion.a
                          href={lastWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#08140B] font-bold text-sm shadow-lg shadow-[#25D366]/20 flex items-center gap-2 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4 fill-current" />
                          <span>{t('openWhatsAppDirectly')}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </motion.a>
                      </div>
                    )}

                    <motion.button
                      onClick={() => setSubmitted(false)}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 px-5 py-2 rounded-xl bg-[#08140B] border border-white/20 text-gray-300 hover:text-white font-mono text-xs transition-colors cursor-pointer"
                    >
                      {language === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    {errorMsg && (
                      <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
                        {errorMsg}
                      </div>
                    )}

                    <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#08140B] border border-white/10 text-xs text-[#a3e635] font-mono">
                      <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                      <span>
                        {language === 'fr'
                          ? 'Routage direct vers WhatsApp (+243 900 16 36 58)'
                          : 'Direct forwarding to WhatsApp (+243 900 16 36 58)'}
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                        {t('formNameLabel')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('formNamePlaceholder')}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#08140B] border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#a3e635] text-sm font-sans transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                        {t('formEmailLabel')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t('formEmailPlaceholder')}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#08140B] border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#a3e635] text-sm font-sans transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-gray-400 mb-2">
                        {t('formMsgLabel')} *
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={t('formMsgPlaceholder')}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#08140B] border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#a3e635] text-sm font-sans transition-colors resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 rounded-xl bg-[#a3e635] text-[#08140B] font-bold text-sm hover:bg-[#b5f448] transition-colors shadow-md shadow-[#a3e635]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{t('formSendingBtn')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('formSubmitBtn')}</span>
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
