import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Instagram, Twitter, MessageSquare, Loader2, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';

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

  const WHATSAPP_NUMBER = '243900163658';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg(t('formFillAll'));
      return;
    }

    setLoading(true);

    // Format the WhatsApp message with user details
    const whatsappMessage = language === 'fr'
      ? `👋 *Nouveau message depuis le Portfolio Aaron Tech*\n\n👤 *Nom :* ${formData.name.trim()}\n📧 *Email :* ${formData.email.trim()}\n\n📝 *Message :*\n${formData.message.trim()}\n\n---`
      : `👋 *New inquiry from Aaron Tech Portfolio*\n\n👤 *Name:* ${formData.name.trim()}\n📧 *Email:* ${formData.email.trim()}\n\n📝 *Message:*\n${formData.message.trim()}\n\n---`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    setLastWhatsappUrl(whatsappUrl);

    try {
      // 1. Send data to server API as backup/logging (non-blocking)
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, whatsappForwarded: true, targetPhone: WHATSAPP_NUMBER }),
      }).catch((err) => console.log('Server backup error (non-blocking):', err));

      // 2. Trigger rich confetti explosion FIRST on the user screen
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.55 },
        colors: ['#a3e635', '#84cc16', '#4ade80', '#ffffff'],
      });

      // Extra burst for visual delight
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#a3e635', '#84cc16', '#ffffff'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#a3e635', '#84cc16', '#ffffff'],
        });
      }, 250);

      // 3. Mark form as submitted & clear inputs
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      // 4. Open WhatsApp with a brief delay so the user enjoys the full confetti explosion & success view
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
    <section id="contacts" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Badge */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-xs font-mono text-[#a3e635] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#a3e635]" />
            <span>{t('contactBadge')}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t('contactSectionTitle')} <span className="text-[#a3e635]">{t('contactSectionHighlight')}</span>
          </h2>
        </div>

        {/* Grid Container matching reference screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Side: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-gray-300 text-base leading-relaxed">
              {t('contactIntroText')}
            </p>

            {/* Email Card */}
            <a
              href={`mailto:${personalInfo.email}`}
              className="flex items-center gap-4 bg-[#091B0E] border border-[#a3e635]/20 hover:border-[#a3e635] p-5 rounded-2xl backdrop-blur-md transition-all group"
            >
              <div className="p-3.5 rounded-xl bg-[#0F2818] border border-[#a3e635]/30 group-hover:bg-[#a3e635]/10 transition-colors">
                <Mail className="w-5 h-5 text-[#a3e635]" />
              </div>
              <div>
                <span className="text-xs font-mono text-gray-400 block">Email</span>
                <span className="text-sm font-bold text-white group-hover:text-[#a3e635] transition-colors">
                  {personalInfo.email}
                </span>
              </div>
            </a>

            {/* WhatsApp / Phone Card */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#091B0E] border border-[#a3e635]/20 hover:border-[#a3e635] p-5 rounded-2xl backdrop-blur-md transition-all group"
            >
              <div className="p-3.5 rounded-xl bg-[#0F2818] border border-[#a3e635]/30 group-hover:bg-[#a3e635]/10 transition-colors">
                <Phone className="w-5 h-5 text-[#a3e635]" />
              </div>
              <div>
                <span className="text-xs font-mono text-gray-400 block">WhatsApp & Téléphone</span>
                <span className="text-sm font-bold text-white group-hover:text-[#a3e635] transition-colors">
                  +243 900 16 36 58
                </span>
              </div>
            </a>

            {/* Location Card */}
            <div className="flex items-center gap-4 bg-[#091B0E] border border-[#a3e635]/20 p-5 rounded-2xl backdrop-blur-md">
              <div className="p-3.5 rounded-xl bg-[#0F2818] border border-[#a3e635]/30">
                <MapPin className="w-5 h-5 text-[#a3e635]" />
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
                Réseaux & Plateformes
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#091B0E] border border-[#a3e635]/20 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#091B0E] border border-[#a3e635]/20 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#091B0E] border border-[#a3e635]/20 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-all"
                  aria-label="X / Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#091B0E] border border-[#a3e635]/20 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#091B0E]/90 border border-[#a3e635]/30 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl relative">

              {submitted ? (
                <div className="py-8 text-center space-y-5 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#a3e635]/20 text-[#a3e635] flex items-center justify-center mx-auto border border-[#a3e635]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {t('formSuccessTitle')}
                  </h3>
                  <p className="text-gray-300 text-sm max-w-md mx-auto leading-relaxed">
                    {t('formSuccessDesc')}
                  </p>

                  {/* Direct WhatsApp Action Button */}
                  {lastWhatsappUrl && (
                    <div className="pt-2 flex flex-col items-center gap-3">
                      <a
                        href={lastWhatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#08140B] font-bold text-sm shadow-lg shadow-[#25D366]/30 flex items-center gap-2.5 transition-all transform hover:scale-105"
                      >
                        <MessageSquare className="w-5 h-5 fill-current" />
                        <span>{t('openWhatsAppDirectly')}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#0F2818] border border-[#a3e635]/40 text-[#a3e635] font-bold text-xs hover:bg-[#a3e635]/15 transition-all cursor-pointer"
                  >
                    {language === 'fr' ? 'Envoyer un autre message' : 'Send another message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {errorMsg && (
                    <div className="p-4 rounded-xl bg-red-900/30 border border-red-500/50 text-red-300 text-xs font-mono">
                      {errorMsg}
                    </div>
                  )}

                  {/* WhatsApp Direct Forwarding Info Badge */}
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#0F2818]/90 border border-[#a3e635]/30 text-xs text-[#a3e635]">
                    <MessageSquare className="w-4 h-4 shrink-0 text-[#a3e635]" />
                    <span className="font-mono text-[11px]">
                      {language === 'fr'
                        ? 'Vos informations seront transmises directement au WhatsApp (+243 900 16 36 58)'
                        : 'Your details will be forwarded directly to WhatsApp (+243 900 16 36 58)'}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">
                      {t('formNameLabel')} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('formNamePlaceholder')}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-[#08140B] border border-[#a3e635]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">
                      {t('formEmailLabel')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('formEmailPlaceholder')}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-[#08140B] border border-[#a3e635]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635] transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-gray-300 mb-2">
                      {t('formMsgLabel')} *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('formMsgPlaceholder')}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-[#08140B] border border-[#a3e635]/20 text-white placeholder-gray-500 focus:outline-none focus:border-[#a3e635] focus:ring-1 focus:ring-[#a3e635] transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-[#a3e635] text-[#08140B] font-bold text-sm hover:bg-[#bbf246] transition-all hover:shadow-lg hover:shadow-[#a3e635]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{t('formSendingBtn')}</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4" />
                        <span>{t('formSubmitBtn')}</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

