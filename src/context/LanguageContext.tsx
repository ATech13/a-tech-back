import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  PERSONAL_INFO_FR,
  PERSONAL_INFO_EN,
  METRICS_FR,
  METRICS_EN,
  VALUE_PILLARS_FR,
  VALUE_PILLARS_EN,
  SKILLS_FR,
  SKILLS_EN,
  PROJECTS_FR,
  PROJECTS_EN
} from '../data/portfolioData';
import { Metric, Skill, Project, ValuePillar } from '../types';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  personalInfo: typeof PERSONAL_INFO_FR;
  metrics: Metric[];
  valuePillars: ValuePillar[];
  skills: Skill[];
  projects: Project[];
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // Navbar
    home: "Accueil",
    about: "A-propos",
    skills: "Compétences",
    projects: "Projets",
    contact: "Contacts",
    estimator: "Devis",
    start: "Commencer",
    cli: "CLI",

    // Hero & General
    heroTitle: "CEO & Cofondateur d'AXIUM | Développeur Full-Stack & Entrepreneur Tech",
    heroDesc: "Concepteur d'applications avant-gardistes, performantes et scalables.",
    aiBannerTitle: "Interrogez mon Copilot AI (Gemini)",
    aiBannerDesc: "Posez des questions sur mes projets (Noboté, Eclypse, GenioTech), compétences, devis ou mon rôle chez AXIUM !",
    chatWithAI: "Discuter avec Aaron AI Copilot",
    estimateProject: "Estimer un projet",

    // About Section
    aboutSectionTitlePrefix: "CEO & Cofondateur d'AXIUM",
    aboutSectionTitleSuffix: "Développeur Full-Stack & Entrepreneur Tech",
    basedIn: "Basé à",
    techLeadershipAXIUM: "Direction technique AXIUM",
    rartechContribution: "Contribution Écosystème Rartech",
    scalableFullstackApps: "Applications Full-Stack Scalables",
    videoContentCreation: "Montage & Content Creation",
    readyToBuildTitle: "Prêt à donner vie à votre prochain projet ?",
    readyToBuildDesc: "Discutons de vos ambitions et construisons ensemble des solutions sur mesure.",
    estimateBudgetBtn: "Estimer votre budget",
    contactMeBtn: "Me contacter",

    // Skills Section
    skillsBadge: "compétences",
    skillsSectionTitle: "Stack & Expertises",
    skillsSectionHighlight: "Techniques",
    skillsSectionDesc: "Un éventail d'outils modernes pour concevoir des produits digitaux résilients, rapides et visuellement percutants.",
    allCategories: "Tous",
    catFrontendSub: "Interfaces fluides, accessibles et pixel-perfect.",
    catBackendSub: "APIs, REST, logique métier et architecture serveur.",
    catDevOpsSub: "Déploiement, conteneurisation et gestion de version.",
    catVideoSub: "Storytelling visuel, motion et post-production.",
    masteryLevel: "Niveau de maîtrise",
    skillsCatFrontend: "Frontend",
    skillsCatBackend: "Backend",
    skillsCatDevOps: "DevOps & Outils",
    skillsCatVideo: "Montage Vidéo",

    // Projects Section
    projectsBadge: "projets",
    projectsSectionTitle: "Réalisations &",
    projectsSectionHighlight: "Projets Phares",
    projectsSectionDesc: "Je développe et accompagne des projets d'impact dans l'écosystème AXIUM, Rartech et Ecocinq, avec une approche orientée produit, innovation et visibilité digitale.",
    filterAll: "Tous",
    viewProjectBtn: "Voir le projet",
    projectDetailsTitle: "Détails du projet",
    tabOverview: "Aperçu",
    tabFeatures: "Fonctionnalités Clés",
    tabArchitecture: "Architecture & Stack",
    liveDemoBtn: "Tester la démo",
    sourceCodeBtn: "Code Source",
    usersStat: "Utilisateurs",
    ratingStat: "Note",
    performanceStat: "Performance",

    // Contact Section
    contactBadge: "contacts",
    contactSectionTitle: "Discutons d'un",
    contactSectionHighlight: "projet d'impact",
    contactIntroText: "Que ce soit pour un projet web, une application mobile, un produit digital ou une collaboration entrepreneuriale — je suis à un message de distance.",
    formNameLabel: "Votre Nom complet",
    formNamePlaceholder: "Ex: Jean Dupont",
    formEmailLabel: "Votre Adresse Email",
    formEmailPlaceholder: "jean.dupont@entreprise.com",
    formMsgLabel: "Détails de votre projet / Message",
    formMsgPlaceholder: "Parlez-moi de vos objectifs, fonctionnalités souhaitées ou calendrier envisagé...",
    formSubmitBtn: "Envoyer le message",
    formSendingBtn: "Envoi en cours...",
    formSuccessTitle: "Message envoyé avec succès !",
    formSuccessDesc: "Merci pour votre message. Vos informations sont prêtes et transmises à Aaron Lumoo sur WhatsApp (+243 900 16 36 58).",
    formFillAll: "Veuillez remplir tous les champs du formulaire.",
    openWhatsAppDirectly: "Ouvrir WhatsApp (+243 900 16 36 58)",
    sendViaWhatsAppBtn: "Envoyer via WhatsApp & Enregistrer",

    // Footer
    footerTagline: "Développeur Full-Stack créant des expériences digitales modernes et performantes.",
    footerNavTitle: "Navigation",
    footerProjectsTitle: "Projets Phares",
    footerQuickLinks: "Liens Rapides",
    footerEstimatorLink: "Calculateur de Devis",
    footerTerminalLink: "Terminal Développeur (CLI)",
    footerAILink: "Aaron AI Copilot (Gemini)",
    footerAllRightsReserved: "Tous droits réservés.",
    footerDesignedBy: "Conçu & Développé avec excellence par",

    // Floating AI
    floatingAIQuestion: "Une question ? Parler à Aaron AI",
    floatingAICopilot: "Copilot Interactif",

    // AI Drawer
    aiDrawerTitle: "Aaron AI Copilot",
    aiDrawerSubtitle: "Assistant Virtuel Gemini",
    aiOnlineStatus: "En ligne",
    aiWelcomeMessage: "Bonjour ! Je suis \"Aaron AI\", l'assistant virtuel dédié d'Aaron Tech (CEO & Cofondateur d'AXIUM). Que souhaitez-vous savoir sur son parcours, ses projets ou ses tarifs ?",
    aiInputPlaceholder: "Posez votre question à Aaron AI...",
    aiQuickQuestionsTitle: "Suggestions rapides :",
    aiQ1: "Quels sont les projets récents d'Aaron Tech ?",
    aiQ2: "Quelles sont ses compétences clés ?",
    aiQ3: "Comment le contacter pour un projet ?",
    aiQ4: "Développez-vous des applications mobiles ?",

    // Project Estimator Modal
    estimatorTitle: "Calculateur & Estimateur de Projet",
    estimatorSubtitle: "Évaluez la faisabilité, la stack recommandée et les délais estimés pour votre application avec l'aide d'Aaron AI.",
    projectTypeLabel: "Type de projet",
    featuresLabel: "Fonctionnalités souhaitées",
    timelineLabel: "Délai souhaité",
    descriptionLabel: "Brève description (Optionnel)",
    descriptionPlaceholder: "Ex: Une application SaaS de facturation avec paiements automatisés et export comptable...",
    calculateBtn: "Générer l'estimation IA",
    calculatingBtn: "Calcul de l'estimation...",
    estimationResultTitle: "Estimation du Projet",
    timeframeLabel: "Délai estimé",
    complexityLabel: "Niveau de complexité",
    recommendedStackLabel: "Technologies recommandées",
    summaryLabel: "Synthèse technique",
    discussProjectBtn: "Discuter de ce projet avec Aaron"
  },
  en: {
    // Navbar
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    contact: "Contact",
    estimator: "Quote",
    start: "Get Started",
    cli: "CLI",

    // Hero & General
    heroTitle: "CEO & Co-founder at AXIUM | Full-Stack Developer & Tech Entrepreneur",
    heroDesc: "Building cutting-edge, high-performance and scalable applications.",
    aiBannerTitle: "Ask my AI Copilot (Gemini)",
    aiBannerDesc: "Ask questions about my projects (Noboté, Eclypse, GenioTech), skills, quotes or my role at AXIUM!",
    chatWithAI: "Chat with Aaron AI Copilot",
    estimateProject: "Estimate a project",

    // About Section
    aboutSectionTitlePrefix: "CEO & Co-founder at AXIUM",
    aboutSectionTitleSuffix: "Full-Stack Developer & Tech Entrepreneur",
    basedIn: "Based in",
    techLeadershipAXIUM: "AXIUM Tech Leadership",
    rartechContribution: "Rartech Ecosystem Contribution",
    scalableFullstackApps: "Scalable Full-Stack Applications",
    videoContentCreation: "Video Editing & Content Creation",
    readyToBuildTitle: "Ready to bring your next project to life?",
    readyToBuildDesc: "Let's discuss your vision and build tailor-made digital solutions together.",
    estimateBudgetBtn: "Estimate your budget",
    contactMeBtn: "Contact me",

    // Skills Section
    skillsBadge: "skills",
    skillsSectionTitle: "Tech Stack &",
    skillsSectionHighlight: "Expertise",
    skillsSectionDesc: "A modern arsenal of tools to engineer resilient, lightning-fast, and visually stunning digital products.",
    allCategories: "All",
    catFrontendSub: "Fluid, accessible, and pixel-perfect interfaces.",
    catBackendSub: "APIs, REST, business logic, and server architecture.",
    catDevOpsSub: "Deployment, containerization, and version control.",
    catVideoSub: "Visual storytelling, motion, and post-production.",
    masteryLevel: "Proficiency Level",
    skillsCatFrontend: "Frontend",
    skillsCatBackend: "Backend",
    skillsCatDevOps: "DevOps & Tools",
    skillsCatVideo: "Video Editing",

    // Projects Section
    projectsBadge: "projects",
    projectsSectionTitle: "Featured &",
    projectsSectionHighlight: "Flagship Projects",
    projectsSectionDesc: "I build and scale high-impact projects across the AXIUM, Rartech, and Ecocinq ecosystems, with a product-driven and innovative approach.",
    filterAll: "All",
    viewProjectBtn: "View project",
    projectDetailsTitle: "Project Details",
    tabOverview: "Overview",
    tabFeatures: "Key Features",
    tabArchitecture: "Architecture & Stack",
    liveDemoBtn: "Live Demo",
    sourceCodeBtn: "Source Code",
    usersStat: "Users",
    ratingStat: "Rating",
    performanceStat: "Performance",

    // Contact Section
    contactBadge: "contact",
    contactSectionTitle: "Let's discuss an",
    contactSectionHighlight: "impactful project",
    contactIntroText: "Whether for a web app, a mobile solution, a digital product, or an entrepreneurial partnership — I am just a message away.",
    formNameLabel: "Full Name",
    formNamePlaceholder: "e.g. John Doe",
    formEmailLabel: "Email Address",
    formEmailPlaceholder: "john.doe@company.com",
    formMsgLabel: "Project Details / Message",
    formMsgPlaceholder: "Tell me about your objectives, desired features, or anticipated timeline...",
    formSubmitBtn: "Send Message",
    formSendingBtn: "Sending message...",
    formSuccessTitle: "Message successfully sent!",
    formSuccessDesc: "Thank you for reaching out. Your message details are ready and forwarded to Aaron Lumoo on WhatsApp (+243 900 16 36 58).",
    formFillAll: "Please fill in all form fields.",
    openWhatsAppDirectly: "Open WhatsApp (+243 900 16 36 58)",
    sendViaWhatsAppBtn: "Send via WhatsApp & Submit",

    // Footer
    footerTagline: "Full-Stack Developer crafting modern, high-performance digital experiences.",
    footerNavTitle: "Navigation",
    footerProjectsTitle: "Flagship Projects",
    footerQuickLinks: "Quick Links",
    footerEstimatorLink: "Project Cost Estimator",
    footerTerminalLink: "Developer CLI Terminal",
    footerAILink: "Aaron AI Copilot (Gemini)",
    footerAllRightsReserved: "All rights reserved.",
    footerDesignedBy: "Engineered & Designed with excellence by",

    // Floating AI
    floatingAIQuestion: "Got a question? Ask Aaron AI",
    floatingAICopilot: "Interactive Copilot",

    // AI Drawer
    aiDrawerTitle: "Aaron AI Copilot",
    aiDrawerSubtitle: "Gemini Virtual Assistant",
    aiOnlineStatus: "Online",
    aiWelcomeMessage: "Hello! I am \"Aaron AI\", the dedicated virtual assistant for Aaron Tech (CEO & Co-founder at AXIUM). What would you like to know about his background, projects, or pricing?",
    aiInputPlaceholder: "Ask Aaron AI anything...",
    aiQuickQuestionsTitle: "Quick prompts:",
    aiQ1: "What are Aaron Tech's recent projects?",
    aiQ2: "What are his core technical skills?",
    aiQ3: "How can I contact him for a new project?",
    aiQ4: "Do you build mobile applications?",

    // Project Estimator Modal
    estimatorTitle: "Project Cost & Feasibility Estimator",
    estimatorSubtitle: "Assess project feasibility, recommended tech stack, and estimated timelines with Aaron AI.",
    projectTypeLabel: "Project type",
    featuresLabel: "Desired features",
    timelineLabel: "Desired timeline",
    descriptionLabel: "Brief description (Optional)",
    descriptionPlaceholder: "e.g. A SaaS invoicing web app with automated payment webhooks and tax reporting export...",
    calculateBtn: "Generate AI Estimation",
    calculatingBtn: "Calculating estimation...",
    estimationResultTitle: "Project Estimation",
    timeframeLabel: "Estimated Timeframe",
    complexityLabel: "Complexity Level",
    recommendedStackLabel: "Recommended Stack",
    summaryLabel: "Technical Summary",
    discussProjectBtn: "Discuss this project with Aaron"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const personalInfo = useMemo(() => {
    return language === 'fr' ? PERSONAL_INFO_FR : PERSONAL_INFO_EN;
  }, [language]);

  const metrics = useMemo(() => {
    return language === 'fr' ? METRICS_FR : METRICS_EN;
  }, [language]);

  const valuePillars = useMemo(() => {
    return language === 'fr' ? VALUE_PILLARS_FR : VALUE_PILLARS_EN;
  }, [language]);

  const skills = useMemo(() => {
    return language === 'fr' ? SKILLS_FR : SKILLS_EN;
  }, [language]);

  const projects = useMemo(() => {
    return language === 'fr' ? PROJECTS_FR : PROJECTS_EN;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        personalInfo,
        metrics,
        valuePillars,
        skills,
        projects,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
