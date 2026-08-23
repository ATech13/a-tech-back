export interface Metric {
  label: string;
  value: string;
  description?: string;
}

export interface Skill {
  name: string;
  level: number;
  iconName: string;
  category: 'Frontend' | 'Backend' | 'DevOps & Outils' | 'Montage Vidéo';
  description?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  category: 'Frontend' | 'Fullstack' | 'Mobile/Web' | 'Crypto' | 'Outils';
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
  stats?: {
    users?: string;
    rating?: string;
    performance?: string;
  };
  features?: string[];
  architecture?: string[];
}

export interface ValuePillar {
  title: string;
  description: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface EstimationResult {
  estimatedTimeframe: string;
  complexityLevel: string;
  recommendedStack: string[];
  summary: string;
}
