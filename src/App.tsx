import React, { useState } from 'react';
import { BackgroundCanvas } from './components/BackgroundCanvas';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { ProjectEstimatorModal } from './components/ProjectEstimatorModal';
import { FloatingAITrigger } from './components/FloatingAITrigger';

export default function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [estimatorOpen, setEstimatorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#08140B] text-white font-sans selection:bg-[#a3e635] selection:text-[#08140B] relative overflow-x-hidden">
      {/* Interactive Floating Particle & Grid Background */}
      <BackgroundCanvas />

      {/* Main Header Navigation */}
      <Header
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAI={() => setAiOpen(true)}
        onOpenEstimator={() => setEstimatorOpen(true)}
      />

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenAI={() => setAiOpen(true)}
        />

        {/* About Section */}
        <AboutSection
          onOpenEstimator={() => setEstimatorOpen(true)}
        />

        {/* Skills Section */}
        <SkillsSection />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Floating AI Copilot Trigger */}
      <FloatingAITrigger onOpenAI={() => setAiOpen(true)} />

      {/* Interactive CLI Terminal Drawer */}
      <InteractiveTerminal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onOpenAI={() => setAiOpen(true)}
        onOpenEstimator={() => setEstimatorOpen(true)}
      />

      {/* Aaron AI Copilot Drawer */}
      <AIAssistantDrawer
        isOpen={aiOpen}
        onClose={() => setAiOpen(false)}
      />

      {/* Project Estimator Modal */}
      <ProjectEstimatorModal
        isOpen={estimatorOpen}
        onClose={() => setEstimatorOpen(false)}
        onOpenContact={() => {
          const el = document.getElementById('contacts');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />
    </div>
  );
}
