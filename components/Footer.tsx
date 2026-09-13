'use client';
import React from 'react';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { Github, Instagram, Twitter, MessageSquare, ArrowUp } from 'lucide-react';
import { motion } from 'motion/react';
import { MOTION_DURATIONS, MOTION_EASE } from '@/lib/motion';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060F08] border-t border-[#a3e635]/20 relative z-7 pt-16 pb-8 text-gray-400 text-sm">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: MOTION_DURATIONS.section, ease: MOTION_EASE.smooth }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="font-bold text-2xl text-white">
                A<span className="font-light text-[#a3e635]">TECH</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              Développeur Full-Stack créant des expériences digitales modernes, performantes et axées sur l'impact.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <motion.a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-[#091B0E] border border-white/10 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-colors"
              >
                <Github className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-[#091B0E] border border-white/10 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={PERSONAL_INFO.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-[#091B0E] border border-white/10 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
              <motion.a
                href={PERSONAL_INFO.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-[#091B0E] border border-white/10 hover:border-[#a3e635] text-gray-300 hover:text-[#a3e635] transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('accueil')}
                  className="hover:text-[#a3e635] transition-colors cursor-pointer"
                >
                  • Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('a-propos')}
                  className="hover:text-[#a3e635] transition-colors cursor-pointer"
                >
                  • A-propos
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('competences')}
                  className="hover:text-[#a3e635] transition-colors cursor-pointer"
                >
                  • Stack
                </button>
              </li>
            </ul>
          </div>

          {/* Sections Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Sections</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('competences')}
                  className="hover:text-[#a3e635] transition-colors cursor-pointer"
                >
                  • Compétences
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('projets')}
                  className="hover:text-[#a3e635] transition-colors cursor-pointer"
                >
                  • Projets
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contacts')}
                  className="hover:text-[#a3e635] transition-colors cursor-pointer"
                >
                  • Contacts
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Infos */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Infos</h4>
            <div className="space-y-2 text-xs">
              <p>Email: <span className="text-gray-300">{PERSONAL_INFO.email}</span></p>
              <p>Localisation: <span className="text-gray-300">{PERSONAL_INFO.location}</span></p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>
            © 2026 AaronTech. Tous les droits sont réservés. <br className="sm:hidden" />
            Designed & developed by <span className="text-[#a3e635] font-bold">AaronTech</span>
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth }}
            className="px-4 py-2 rounded-full bg-[#0F2818] border border-[#a3e635]/30 text-[#a3e635] hover:bg-[#a3e635] hover:text-[#08140B] transition-colors flex items-center gap-2 cursor-pointer group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Haut</span>
          </motion.button>
        </div>

      </motion.div>
    </footer>
  );
};
