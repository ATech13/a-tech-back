'use client';
import React, { useState, useEffect } from 'react';
import { Home, User, Cpu, FolderGit2, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'motion/react';
import { MOTION_DURATIONS, MOTION_EASE } from '@/lib/motion';

interface NavItem {
  id: string;
  labelKey: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'accueil', labelKey: 'home', icon: Home },
  { id: 'a-propos', labelKey: 'about', icon: User },
  { id: 'competences', labelKey: 'skills', icon: Cpu },
  { id: 'projets', labelKey: 'projects', icon: FolderGit2 },
  { id: 'contacts', labelKey: 'contact', icon: MessageSquare },
];

export const BottomNav: React.FC = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('accueil');
  const [visible, setVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((e) => e.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActiveSection(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: [0.1, 0.3, 0.6],
    });

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Subtle scroll-aware hide/reveal behavior
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY > 200) {
            const diff = currentY - lastScrollY;
            if (diff > 30) {
              // Scrolling down
              setVisible(false);
            } else if (diff < -20) {
              // Scrolling up
              setVisible(true);
            }
          } else {
            setVisible(true);
          }
          setLastScrollY(currentY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setActiveSection(id);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      aria-label="Navigation mobile"
      animate={{ y: visible ? 0 : 80 }}
      transition={{ duration: MOTION_DURATIONS.standard, ease: MOTION_EASE.smooth }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom,0px))]"
    >
      <div className="mx-3 mb-2 rounded-2xl bg-[#091B0E]/95 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80">
        <ul className="flex items-center justify-around h-15 px-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const label = t(item.labelKey) || item.id;

            return (
              <li key={item.id} className="flex-1">
                <motion.button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  whileTap={{ scale: 0.92 }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative w-full py-1 flex flex-col items-center justify-center transition-colors duration-150 select-none cursor-pointer ${
                    isActive ? 'text-[#a3e635]' : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {/* Subtle active pill behind icon/label */}
                  {isActive && (
                    <motion.span
                      layoutId="bottomNavActivePill"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                      className="absolute inset-0 bg-[#0F2818] rounded-xl border border-[#a3e635]/20"
                    />
                  )}

                  {/* Icon */}
                  <div className="relative z-10 flex items-center justify-center h-5 mt-0.5">
                    <Icon
                      className={`w-4.5 h-4.5 transition-transform duration-200 ${
                        isActive ? 'scale-110 text-[#a3e635]' : 'scale-100 text-gray-400'
                      }`}
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`relative z-10 text-[10px] font-mono tracking-tight transition-all duration-150 mt-1 line-clamp-1 ${
                      isActive ? 'font-bold text-[#a3e635]' : 'font-normal text-gray-400'
                    }`}
                  >
                    {label}
                  </span>

                  {/* Micro active indicator dot */}
                  <span
                    className={`relative z-10 w-1 h-1 rounded-full transition-all duration-200 mt-0.5 ${
                      isActive ? 'bg-[#a3e635] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
                    }`}
                  />
                </motion.button>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
};
