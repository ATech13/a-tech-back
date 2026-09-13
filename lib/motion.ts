import { Transition, Variants } from 'motion/react';

// Design System Motion Durations
export const MOTION_DURATIONS = {
  micro: 0.15, // 150ms
  hover: 0.2, // 200ms
  standard: 0.25, // 250ms
  drawer: 0.35, // 350ms
  section: 0.5, // 500ms
} as const;

// Custom Smooth Easing Curves
export const MOTION_EASE = {
  smooth: [0.16, 1, 0.3, 1], // easeOutExpo-inspired, modern & crisp
  gentle: [0.25, 0.1, 0.25, 1],
  spring: { type: 'spring', stiffness: 350, damping: 25 },
} as const;

// Standard Transition Configs
export const transitions = {
  micro: { duration: MOTION_DURATIONS.micro, ease: MOTION_EASE.smooth },
  standard: { duration: MOTION_DURATIONS.standard, ease: MOTION_EASE.smooth },
  drawer: { duration: MOTION_DURATIONS.drawer, ease: MOTION_EASE.smooth },
  section: { duration: MOTION_DURATIONS.section, ease: MOTION_EASE.smooth },
  spring: { type: 'spring', stiffness: 380, damping: 28 },
};

// Section Entrance Variants
export const sectionFadeInVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.section,
      ease: MOTION_EASE.smooth,
    },
  },
};

// Stagger Container Variants
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

// Stagger Child Item
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.standard,
      ease: MOTION_EASE.smooth,
    },
  },
};

// Modal Scale & Fade Variants
export const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.drawer,
      ease: MOTION_EASE.smooth,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    y: 6,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

// Backdrop Fade Variants
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Drawer Slide Variants (Right Side)
export const drawerSlideVariants: Variants = {
  hidden: { x: '100%', opacity: 0.8 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.drawer,
      ease: MOTION_EASE.smooth,
    },
  },
  exit: {
    x: '100%',
    opacity: 0.5,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
};
