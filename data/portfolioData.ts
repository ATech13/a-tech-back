import { Metric, Skill, Project, ValuePillar } from '@/types';

// Static public image paths
const avatarImg = '/bg/atech2.png';
const noboteImg = '/projects/nobote.png';
const geniotechImg = '/projects/geniotech.png';
const todolistImg = '/projects/to-do-list.png';
const libaya = '/projects/libaya.png';
const eclypseImg = '/projects/eclypse.png';
const cvbuilderImg = '/projects/cv1.png';
const worktrack = '/projects/worktrack.png';
const fintrack = '/projects/fin4.png';
const axiumarket = '/projects/axium.png';

export const PERSONAL_INFO_FR = {
  name: "Aaron Tech",
  fullName: "Aaron Lumoo",
  title: "CEO & Cofondateur d'AXIUM | Développeur Full-Stack & Entrepreneur Tech",
  bio: "Je suis Aaron Tech, participant à des projets portés par la startup Rartech comme Noboté, Ecocinq et d'autres initiatives digitales d'impact. Je transforme des idées ambitieuses en produits concrets, performants et visibles sur le web.",
  quote: "Mon objectif: créer des solutions numériques utiles, élégantes et scalables, mêlant innovation, leadership et excellence technique pour des résultats concrets.",
  location: "RDC - Nord-Kivu - Goma",
  email: "lumooaaron@gmail.com",
  phone: "+243 900 16 36 58",
  avatar: avatarImg,
  socials: {
    github: "https://github.com/atech13",
    instagram: "https://instagram.com/aarontech13",
    twitter: "https://x.com/atech7h",
    whatsapp: "https://wa.me/243900163658?text=Bonjour%20AaronTech,%20je%20viens%20de%20d%C3%A9couvrir%20votre%20portfolio%20et%20je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20services.%20J%27aimerais%20%C3%A9changer%20avec%20vous%20au%20sujet%20d%27un%20projet.%20Merci%20de%20me%20recontacter%20lorsque%20vous%20serez%20disponible.",
  }
};

export const PERSONAL_INFO_EN = {
  name: "Aaron Tech",
  fullName: "Aaron Lumoo",
  title: "Full-Stack Developer | Tech Entrepreneur",
  bio: "I am Aaron Tech, CEO and co-founder of AXIUM, and contributor to impact-driven digital projects such as Noboté, Ecocinq, and other innovative initiatives. I transform ambitious ideas into concrete, high-performance, and scalable digital products.",
  quote: "My goal: create useful, elegant, and scalable digital solutions, combining innovation, leadership, and technical excellence for tangible results.",
  location: "DRC - North Kivu - Goma",
  email: "lumooaaron@gmail.com",
  phone: "+243 900 16 36 58",
  avatar: avatarImg,
  socials: {
    github: "https://github.com/atech13",
    instagram: "https://instagram.com/aarontech13",
    twitter: "https://x.com/atech7h",
    whatsapp: "https://wa.me/243900163658?text=Hello%20AaronTech,%20I%20just%20discovered%20your%20portfolio%20and%20I%20am%20interested%20in%20your%20services.",
  }
};

export const PERSONAL_INFO = PERSONAL_INFO_FR;

export const METRICS_FR: Metric[] = [
  { label: "Projets livrés", value: "10+", description: "Applications web, mobile et plateformes d'entreprise" },
  { label: "Clients satisfaits", value: "50+", description: "Partenaires et clients accompagnés" },
  { label: "Années d'expérience", value: "3+", description: "Développement full-stack & leadership tech" },
  { label: "Technologies maîtrisées", value: "15+", description: "Stack moderne React, Node, SQL & Cloud" },
];

export const METRICS_EN: Metric[] = [
  { label: "Delivered Projects", value: "10+", description: "Web, mobile apps and enterprise platforms" },
  { label: "Satisfied Clients", value: "50+", description: "Partners and supported clients" },
  { label: "Years of Experience", value: "3+", description: "Full-stack development & tech leadership" },
  { label: "Mastered Technologies", value: "15+", description: "Modern stack React, Node, SQL & Cloud" },
];

export const METRICS = METRICS_FR;

export const VALUE_PILLARS_FR: ValuePillar[] = [
  {
    title: "Innovation",
    description: "Des solutions créatives et avant-gardistes pour répondre aux défis technologiques de demain.",
    icon: "Lightbulb"
  },
  {
    title: "Performance",
    description: "Des applications rapides, optimisées et scalables, pensées pour une expérience utilisateur fluide.",
    icon: "Zap"
  },
  {
    title: "Qualité",
    description: "Un code propre, maintenable et testé, avec une attention particulière aux moindres détails.",
    icon: "ShieldCheck"
  }
];

export const VALUE_PILLARS_EN: ValuePillar[] = [
  {
    title: "Innovation",
    description: "Creative and forward-thinking solutions to meet tomorrow's technological challenges.",
    icon: "Lightbulb"
  },
  {
    title: "Performance",
    description: "Fast, optimized, and scalable applications built for a seamless user experience.",
    icon: "Zap"
  },
  {
    title: "Quality",
    description: "Clean, maintainable, and tested code with meticulous attention to detail.",
    icon: "ShieldCheck"
  }
];

export const VALUE_PILLARS = VALUE_PILLARS_FR;

export const SKILLS_FR: Skill[] = [
  // Frontend
  { name: "React", level: 90, iconName: "Atom", category: "Frontend", description: "Architecture de composants, Hooks, State Management" },
  { name: "TypeScript", level: 85, iconName: "FileCode", category: "Frontend", description: "Typage strict, interfaces complexes, génériques" },
  { name: "Tailwind CSS", level: 92, iconName: "Palette", category: "Frontend", description: "Design systems ultra fluides, responsive, animations" },
  { name: "Responsive UI", level: 88, iconName: "Layout", category: "Frontend", description: "Mobile first, adaptabilité multi-écrans" },

  // Backend
  { name: "Node.js", level: 90, iconName: "Server", category: "Backend", description: "REST APIs, Express, microservices, websockets" },
  { name: "Postgresql", level: 85, iconName: "Database", category: "Backend", description: "Modélisation relationnelle, requêtes complexes, ORMs" },
  { name: "MongoDB", level: 80, iconName: "HardDrive", category: "Backend", description: "Bases documentaires NoSQL, agrégations" },
  { name: "API Design", level: 88, iconName: "Network", category: "Backend", description: "Architecture propre, sécurité JWT, documentation Open API" },

  // DevOps & Outils
  { name: "Git", level: 90, iconName: "GitBranch", category: "DevOps & Outils", description: "Gestion de versions, workflows GitFlow, révisions" },
  { name: "Docker", level: 75, iconName: "Box", category: "DevOps & Outils", description: "Conteneurisation, multi-stage builds, orchestration base" },
  { name: "Github", level: 70, iconName: "Github", category: "DevOps & Outils", description: "Projets open-source, GitHub Actions, CI/CD" },
  { name: "CI/CD", level: 72, iconName: "Workflow", category: "DevOps & Outils", description: "Déploiement continu, pipelines de test" },

  // Montage Vidéo
  { name: "Premiere Pro", level: 65, iconName: "Video", category: "Montage Vidéo", description: "Montage vidéo dynamique, étalonnage, rythme" },
  { name: "CapCut", level: 78, iconName: "Clapperboard", category: "Montage Vidéo", description: "Création rapide de contenus vidéo réseaux sociaux" },
  { name: "Enregistrement", level: 70, iconName: "Mic", category: "Montage Vidéo", description: "Prise de son, voix off & tutoriels tech" },
  { name: "Motion Design", level: 68, iconName: "Sparkles", category: "Montage Vidéo", description: "Animations graphiques, titres dynamiques, effets" },
];

export const SKILLS_EN: Skill[] = [
  // Frontend
  { name: "React", level: 90, iconName: "Atom", category: "Frontend", description: "Component architecture, Hooks, State Management" },
  { name: "TypeScript", level: 85, iconName: "FileCode", category: "Frontend", description: "Strict typing, complex interfaces, generics" },
  { name: "Tailwind CSS", level: 92, iconName: "Palette", category: "Frontend", description: "Ultra fluid design systems, responsive layout, animations" },
  { name: "Responsive UI", level: 88, iconName: "Layout", category: "Frontend", description: "Mobile-first, multi-screen adaptability" },

  // Backend
  { name: "Node.js", level: 90, iconName: "Server", category: "Backend", description: "REST APIs, Express, microservices, websockets" },
  { name: "Postgresql", level: 85, iconName: "Database", category: "Backend", description: "Relational modeling, complex queries, ORMs" },
  { name: "MongoDB", level: 80, iconName: "HardDrive", category: "Backend", description: "NoSQL document databases, aggregation pipelines" },
  { name: "API Design", level: 88, iconName: "Network", category: "Backend", description: "Clean architecture, JWT security, Open API docs" },

  // DevOps & Tools
  { name: "Git", level: 90, iconName: "GitBranch", category: "DevOps & Outils", description: "Version control, GitFlow workflows, code reviews" },
  { name: "Docker", level: 75, iconName: "Box", category: "DevOps & Outils", description: "Containerization, multi-stage builds, orchestration" },
  { name: "Github", level: 70, iconName: "Github", category: "DevOps & Outils", description: "Open-source projects, GitHub Actions, CI/CD" },
  { name: "CI/CD", level: 72, iconName: "Workflow", category: "DevOps & Outils", description: "Continuous deployment, automated testing pipelines" },

  // Video Editing
  { name: "Premiere Pro", level: 65, iconName: "Video", category: "Montage Vidéo", description: "Dynamic video editing, color grading, pacing" },
  { name: "CapCut", level: 78, iconName: "Clapperboard", category: "Montage Vidéo", description: "Rapid social media video content creation" },
  { name: "Audio Recording", level: 70, iconName: "Mic", category: "Montage Vidéo", description: "Sound recording, voiceovers & tech tutorials" },
  { name: "Motion Design", level: 68, iconName: "Sparkles", category: "Montage Vidéo", description: "Graphic animations, dynamic titles, effects" },
];

export const SKILLS = SKILLS_FR;

export const PROJECTS_FR: Project[] = [
  {
    id: "nobote",
    title: "Noboté",
    subtitle: "Système de vote public en temps réel",
    description: "Projet porté dans l'écosystème Rartech, conçu pour permettre à un public de voter en toute sécurité et de suivre les résultats en temps réel.",
    fullDescription: "Noboté est une solution hautement sécurisée de vote électronique et participatif développée sous l'écosystème Rartech. Elle garantit l'intégrité des résultats grâce à un chiffrement de bout en bout, un suivi analytique en temps réel pour le public et les organisateurs, et un design adaptatif fluide.",
    image: noboteImg,
    tags: ["Next.js", "Typescript", "PostgreSQL", "Tailwind"],
    category: "Fullstack",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://nobote.vercel.app",
    stats: {
      users: "15K+ Votants",
      performance: "99.9% Uptime",
      rating: "4.9/5"
    },
    features: [
      "Système de vote anti-fraude avec authentification unique",
      "Tableau de bord de suivi analytique en temps réel",
      "Notifications push et intégration de paiement mobile money",
      "Interface réactive optimisée pour connexions bas débit"
    ],
    architecture: [
      "Backend Node.js & WebSockets pour le live feed",
      "Base de données PostgreSQL optimisée pour fort volume de requêtes",
      "Front-end Next.js / React avec SSR pour SEO élevé"
    ]
  },
  {
    id: "geniotech",
    title: "GenioTech",
    subtitle: "Plateforme d'apprentissage et vitrine formation",
    description: "Un site de présentation des formations proposées par GenioTech, pensé pour renforcer la visibilité et l'accès à l'information sur la plateforme.",
    fullDescription: "GenioTech est un hub d'excellence technologique. La plateforme offre une interface interactive pour découvrir les parcours de formation en développement web, cybersécurité et intelligence artificielle, avec gestion des inscriptions, communauté d'apprenants et suivi pédagogique.",
    image: geniotechImg,
    tags: ["HTML", "CSS", "JS", "Bootstrap"],
    category: "Frontend",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://geniotech.ecocinq.com",
    stats: {
      users: "500+ Étudiants",
      rating: "4.8/5"
    },
    features: [
      "Catalogue dynamique de formations par niveaux",
      "Formulaire d'inscription directe et paiement d'acompte",
      "Espace ressources téléchargeables pour les étudiants",
      "Architecture SEO poussée pour le recrutement d'apprenants"
    ]
  },
  {
    id: "todo-list",
    title: "To-Do-List",
    subtitle: "Gestionnaire de productivité quotidien",
    description: "Application permettant de planifier ses journées de manière très efficaces, la planification est structurée en tâches.",
    fullDescription: "Une application ultra moderne de gestion des objectifs quotidiens avec système de priorisation matricielle, rappels intelligents, statistiques de complétion visuelles et synchronisation locale instantanée.",
    image: todolistImg,
    tags: ["React", "Tailwind", "Vite", "Typescript"],
    category: "Outils",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://todolist.ecocinq.com",
    stats: {
      rating: "5.0/5",
      performance: "< 50ms latence"
    },
    features: [
      "Organisation Kanban et vue liste personnalisable",
      "Mode Focus avec minuteur Pomodoro intégré",
      "Statistiques de productivité quotidienne et hebdomadaire",
      "Sauvegarde locale fluide et export JSON/CSV"
    ]
  },
  {
    id: "libaya",
    title: "libaya",
    subtitle: "Plate forme pour la gestion moderne de la couture",
    description: "Plateforme simple pour gérer les clients, commandes, mesures et paiements d'un atelier de couture",
    fullDescription: "Une solution complète pour organiser les commandes, suivre la confection, gérer les clients, les mesures, les paiements d'un atelier de couture.",
    image: libaya,
    tags: ["base44"],
    category: "Fullstack",
    featured: false,
    demoUrl: "#",
    githubUrl: "https://libaya-style-flow.base44.app",
    features: [
      "Enregistrez et retrouvez rapidement les mesures.",
      "Visualiser les activités et performances de l'atelier",
      "Controlez vos tissus et accessoires."
    ]
  },
  {
    id: "eclypse",
    title: "Eclypse",
    subtitle: "Plateforme d'investissement crypto & tracking",
    description: "Un site qui permet de faciliter les personnes d'ensavoir plus sur les investissements dans la cryptomonnaie.",
    fullDescription: "Eclypse démocratise la cryptomonnaie en offrant aux débutants comme aux investisseurs aguerris un tableau de bord clair avec graphiques en temps réel, analyses de risque et modules éducatifs.",
    image: eclypseImg,
    tags: ["HTML", "CSS", "JS", "Bootstrap"],
    category: "Frontend",
    featured: false,
    demoUrl: "#",
    githubUrl: "#",
    stats: {
      users: "2.5K Active Users"
    },
    features: [
      "Suivi des cours de plus de 100 crypto-actifs en direct",
      "Simulateur de rendement et gestion de portefeuille fictif",
      "Guides pas-à-pas pour les débutants de la région"
    ]
  },
  {
    id: "cvbuilder",
    title: "CVBuilder",
    subtitle: "Générateur rapide de CV professionnels",
    description: "Application mobile/web permettant de réaliser des CV professionnels en 2 ou 3 clics maximum tout en garantissant une gestion optimale.",
    fullDescription: "CVBuilder permet aux candidats de concevoir un CV moderne et structuré répondant aux exigences ATS en moins de 3 minutes. Inclut des suggestions de compétences personnalisées et un export PDF haute définition.",
    image: cvbuilderImg,
    tags: ["Next.js", "Typescript", "Tailwind"],
    category: "Outils",
    featured: false,
    demoUrl: "#",
    githubUrl: "#",
    features: [
      "Éditeur visuel en temps réel avec aperçu immédiat",
      "Modèles de CV approuvés par des recruteurs",
      "Génération automatique de lettre de motivation",
      "Export PDF vectoriel léger et prêt à imprimer"
    ]
  },
  {
    id: "worktrack",
    title: "WorkTrack",
    subtitle: "Gestion des projets et suivi des tâches",
    description: "Application web permettant aux équipes de suivre l'avancement des projets, d'assigner des tâches et de visualiser les progrès en temps réel.",
    fullDescription: "WorkTrack permet aux équipes de gérer efficacement leurs projets, d'assigner des tâches et de visualiser les progrès en temps réel, avec des notifications automatiques et des rapports détaillés pour une meilleure productivité.",
    image: worktrack,
    tags: ["Next.js", "Typescript", "Tailwind", "ReactQuill"],
    category: "Fullstack",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://work-track-gules.vercel.app/",
    features: [
      "Tableau de bord interactif pour la gestion des projets",
      "Assignation de tâches avec suivi des délais et priorités",
      "Notifications automatiques pour les mises à jour de projet",
      "Rapports détaillés et exportables pour l'analyse de performance"
    ]
  },
  {
    id: "fintrack",
    title: "FinTrack",
    subtitle: "Gestion des finances personnelles",
    description: "Application mobile/web permettant de gérer les finances personnelles, de suivre les dépenses et d'analyser les habitudes de consommation.",
    fullDescription: "FinTrack permet aux utilisateurs de surveiller leur budget, de suivre leurs dépenses et d'obtenir des insights sur leurs habitudes de consommation, avec des rapports détaillés et des alertes personnalisées.",
    image: fintrack,
    tags: ["Next.js", "Typescript", "Tailwind", "Clerk"],
    category: "Fullstack",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://fintrack-weld-alpha.vercel.app/",
    features: [
      "Suivi des dépenses et catégorisation automatique",
      "Alertes personnalisées pour les dépassements de budget",
      "Rapports détaillés et graphiques interactifs pour l'analyse financière",
      "Planification budgétaire avec objectifs financiers et recommandations"
    ]
  },
  {
    id: "axiumarket",
    title: "AXIUMarket",
    subtitle: "Plateforme de commerce électronique pour l'écosystème AXIUM",
    description: "Application web permettant aux utilisateurs d'acheter et de vendre des produits et services au sein de l'écosystème AXIUM, avec une interface intuitive et des fonctionnalités avancées.",
    fullDescription: "AXIUMarket permet aux utilisateurs de naviguer facilement dans une large gamme de produits et services, de comparer les prix et de finaliser leurs achats en toute simplicité.",
    image: axiumarket,
    tags: ["base44"],
    category: "Fullstack",
    featured: false,
    demoUrl: "#",
    githubUrl: "https://neat-near-market-spot.base44.app/",
    features: [
      "Interface utilisateur intuitive et responsive pour une expérience d'achat fluide",
      "Système de recherche et de filtrage avancé",
      "Gestion des paniers et des commandes sur Whatsapp",
      "Sécurité des transactions et protection des données des utilisateurs"
    ]
  }
];

export const PROJECTS_EN: Project[] = [
  {
    id: "nobote",
    title: "Noboté",
    subtitle: "Real-time public voting platform",
    description: "Built within the Rartech ecosystem, designed to enable secure public voting and live results tracking.",
    fullDescription: "Noboté is a highly secure electronic and participatory voting solution developed under the Rartech ecosystem. It guarantees result integrity via end-to-end encryption, real-time live feed analytics for voters and organizers, and an ultra-fluid responsive UI.",
    image: noboteImg,
    tags: ["Next.js", "Typescript", "PostgreSQL", "Tailwind"],
    category: "Fullstack",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://github.com/atech13",
    stats: {
      users: "15K+ Voters",
      performance: "99.9% Uptime",
      rating: "4.9/5"
    },
    features: [
      "Anti-fraud voting system with single-device verification",
      "Live analytics real-time dashboard",
      "Push alerts and mobile money payment integration",
      "Optimized lightweight interface for low-bandwidth environments"
    ],
    architecture: [
      "Node.js backend & WebSockets for instant live stream",
      "PostgreSQL database optimized for high-concurrency requests",
      "Next.js / React front-end with SSR for prime SEO performance"
    ]
  },
  {
    id: "geniotech",
    title: "GenioTech",
    subtitle: "Learning platform & training showcase",
    description: "Showcase portal for tech training programs offered by GenioTech, designed to boost accessibility and student onboarding.",
    fullDescription: "GenioTech is a hub of technological excellence. The platform offers an interactive interface to discover learning tracks in web development, cybersecurity, and artificial intelligence, complete with enrollment management, student community, and curriculum tracking.",
    image: geniotechImg,
    tags: ["HTML", "CSS", "JS", "Bootstrap"],
    category: "Frontend",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://github.com/atech13",
    stats: {
      users: "500+ Students",
      rating: "4.8/5"
    },
    features: [
      "Dynamic catalog of multi-level tech courses",
      "Direct registration form and deposit payments",
      "Downloadable resource center for students",
      "Optimized SEO architecture for learner acquisition"
    ]
  },
  {
    id: "todo-list",
    title: "To-Do-List",
    subtitle: "Daily productivity & task manager",
    description: "Application allowing users to efficiently plan and organize their daily work structured into focused tasks.",
    fullDescription: "An ultra-modern daily productivity tool featuring a priority matrix, smart reminders, visual completion statistics, and instant local state persistence.",
    image: todolistImg,
    tags: ["React", "Tailwind", "Vite", "Typescript"],
    category: "Outils",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://github.com/atech13",
    stats: {
      rating: "5.0/5",
      performance: "< 50ms latency"
    },
    features: [
      "Customizable Kanban board and list view",
      "Focus Mode with integrated Pomodoro timer",
      "Daily and weekly visual productivity statistics",
      "Smooth local persistence and JSON/CSV export"
    ]
  },
  {
    id: "kitumaini",
    title: "Kitumaini",
    subtitle: "Corporate website & innovation showcase",
    description: "Corporate website presenting the engineering services and modern digital solutions delivered by Kitumaini.",
    fullDescription: "Complete corporate showcase of Kitumaini's engineering and digital transformation services. Integrates an interactive project gallery, customized quote calculators, and instant online consultation booking.",
    image: libaya,
    tags: ["HTML", "CSS", "JS", "Bootstrap"],
    category: "Frontend",
    featured: false,
    demoUrl: "#",
    githubUrl: "https://github.com/atech13",
    features: [
      "Polished corporate design aligned with international standards",
      "Automated quote estimation and contact module",
      "Portfolio gallery of enterprise milestones"
    ]
  },
  {
    id: "eclypse",
    title: "Eclypse",
    subtitle: "Crypto investment & live tracking platform",
    description: "Platform designed to help individuals understand and explore cryptocurrency markets and portfolio investments.",
    fullDescription: "Eclypse democratizes crypto investing by providing beginners and seasoned investors with an intuitive dashboard featuring live chart trackers, risk analysis, and educational resources.",
    image: eclypseImg,
    tags: ["HTML", "CSS", "JS", "Bootstrap"],
    category: "Frontend",
    featured: false,
    demoUrl: "#",
    githubUrl: "https://github.com/atech13",
    stats: {
      users: "2.5K Active Users"
    },
    features: [
      "Real-time tracking of 100+ crypto assets",
      "Yield simulator and simulated mock portfolio manager",
      "Step-by-step guides for beginners"
    ]
  },
  {
    id: "cvbuilder",
    title: "CVBuilder",
    subtitle: "Instant professional resume generator",
    description: "Web/mobile app allowing job seekers to generate modern professional resumes in just 2 or 3 clicks.",
    fullDescription: "CVBuilder empowers candidates to design ATS-friendly, elegant resumes in under 3 minutes. Includes automated skill recommendations and crisp high-definition PDF export.",
    image: cvbuilderImg,
    tags: ["Next.js", "Typescript", "Tailwind"],
    category: "Outils",
    featured: false,
    demoUrl: "#",
    githubUrl: "https://github.com/atech13",
    features: [
      "Real-time visual editor with immediate live preview",
      "Recruiter-approved modern resume templates",
      "Automated cover letter generator",
      "Lightweight vector PDF ready for print"
    ]
  },
  {
    id: "worktrack",
    title: "WorkTrack",
    subtitle: "Project management & task tracking",
    description: "Web app enabling teams to monitor project milestones, assign tasks, and track real-time team progress.",
    fullDescription: "WorkTrack equips teams to manage projects smoothly, assign granular tasks, track deadlines, and generate performance reports to skyrocket collective productivity.",
    image: worktrack,
    tags: ["Next.js", "Typescript", "Tailwind", "ReactQuill"],
    category: "Fullstack",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://github.com/atech13",
    features: [
      "Interactive dashboard for comprehensive project management",
      "Task assignment with priority & deadline tracking",
      "Automated real-time notifications for team updates",
      "Detailed exportable productivity reports"
    ]
  },
  {
    id: "fintrack",
    title: "FinTrack",
    subtitle: "Personal finance & expense manager",
    description: "Web/mobile app to track personal expenses, control monthly budgets, and gain insights into spending habits.",
    fullDescription: "FinTrack enables users to control budgets effortlessly, categorize daily expenditures, and receive customized alerts along with insightful financial analytics.",
    image: fintrack,
    tags: ["Next.js", "Typescript", "Tailwind", "Clerk"],
    category: "Fullstack",
    featured: true,
    demoUrl: "#",
    githubUrl: "https://github.com/atech13",
    features: [
      "Automated expense tracking and smart categorization",
      "Custom budget threshold overflow alerts",
      "Interactive graphs and charts for financial analytics",
      "Financial planning with goal tracking and recommendations"
    ]
  },
  {
    id: "axiumarket",
    title: "AXIUMarket",
    subtitle: "E-Commerce hub for the AXIUM ecosystem",
    description: "Web marketplace enabling users to buy and sell products and services within the AXIUM ecosystem with advanced features.",
    fullDescription: "AXIUMarket allows customers to easily browse a wide range of digital and physical goods, compare prices, and seamlessly checkout with direct WhatsApp integration.",
    image: axiumarket,
    tags: ["base44"],
    category: "Fullstack",
    featured: false,
    demoUrl: "#",
    githubUrl: "https://github.com/atech13",
    features: [
      "Intuitive responsive shopping experience",
      "Advanced catalog search and dynamic filtering",
      "Seamless shopping cart and WhatsApp order routing",
      "Secure transactions and user data protection"
    ]
  }
];

export const PROJECTS = PROJECTS_FR;
