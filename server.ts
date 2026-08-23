import "dotenv/config";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const frontendOrigin = process.env.FRONTEND_ORIGIN || '*';
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', frontendOrigin);
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

// In-memory contact messages storage
interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

const contactMessages: ContactMessage[] = [];

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "Aaron Tech Portfolio API" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Tous les champs (nom, email, message) sont requis." });
  }

  const newMessage: ContactMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    email,
    message,
    timestamp: new Date().toISOString(),
  };

  contactMessages.push(newMessage);
  console.log("Nouveau message reçu:", newMessage);

  return res.json({
    success: true,
    message: "Votre message a été transmis à Aaron Tech avec succès !",
    data: newMessage,
  });
});

// Lazy initialize Gemini API client
function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System prompt for Aaron Tech AI Assistant
const AARON_TECH_SYSTEM_PROMPT = `
Vous êtes "Aaron AI", l'assistant virtuel intelligent et représentatif de Aaron Tech (Aaron Lumoo), CEO & Cofondateur d'AXIUM et Développeur Full-Stack & Entrepreneur Tech basé à Goma (RDC, Nord-Kivu).

À propos de Aaron Tech:
- Rôle: CEO & Cofondateur d'AXIUM, développeur Full-Stack, Entrepreneur Tech.
- Startup / Écosystème: AXIUM (AXIUMarket), Rartech (Noboté, Ecocinq), GenioTech.
- Vision: Créer des solutions numériques utiles, élégantes, scalables et avant-gardistes, mêlant innovation, leadership et excellence technique.
- Statistiques: 10+ projets livrés, 50+ clients satisfaits, 3+ années d'expérience, 15+ technologies maîtrisées.
- Compétences Clés:
  - Frontend: React (90%), TypeScript (85%), Tailwind CSS (92%), Responsive UI (88%).
  - Backend: Node.js (90%), PostgreSQL (85%), MongoDB (80%), API Design (88%).
  - DevOps: Git (90%), Docker (75%), GitHub (70%), CI/CD (72%).
  - Creation/Vidéo: Premiere Pro (65%), CapCut (78%), Enregistrement (70%), Motion Design (68%).
- Projets Phares:
  1. Noboté: Plateforme de vote public sécurisée en temps réel pour l'écosystème Rartech.
  2. GenioTech: Vitrine et formations en technologie pour la communauté tech.
  3. To-Do-List: Application ultra-efficace de planification et gestion de tâches.
  4. Kitumaini: Site web d'entreprise valorisant les services et l'innovation Kitumaini.
  5. Eclypse: Plateforme d'accompagnement aux investissements crypto.
  6. CVBuilder: Générateur rapide de CV professionnels en 2-3 clics.
  7. WorkTrack: Application web de gestion de projets et suivi de tâches en temps réel.
  8. FinTrack: Application de gestion des finances personnelles et suivi des dépenses.
  9. AXIUMarket: Plateforme de e-commerce pour l'écosystème AXIUM (avec commandes WhatsApp).
- Contacts: Email (lumooaaron@gmail.com), Téléphone (+243 900 16 36 58), Ville (Goma, Nord-Kivu, RDC).

Répondez de manière professionnelle, conviviale, concise et enthousiaste en français (ou dans la langue de l'utilisateur si demandé). Mettez toujours en valeur le leadership, l'innovation et l'expertise technique d'Aaron Tech
`;

app.post("/api/ai-assistant", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message requis." });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.json({
        reply: `Bonjour ! Je suis l'assistant d'Aaron Tech. Aaron Tech est CEO & Cofondateur d'AXIUM et Développeur Full-Stack expert à Goma (RDC). Pour toute collaboration directe, vous pouvez le contacter à lumooaaron@gmail.com ou au +243 900 16 36 58. (Remarque: Clé API Gemini non configurée dans cet environnement).`,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: `${AARON_TECH_SYSTEM_PROMPT}\n\nHistorique récent: ${JSON.stringify(history || [])}\n\nQuestion de l'utilisateur: ${message}`,
    });

    const reply = response.text || "Désolé, je n'ai pas pu générer de réponse pour le moment.";
    return res.json({ reply });
  } catch (err: any) {
    console.error("Erreur Gemini AI Assistant:", err);
    return res.status(500).json({
      error: "Erreur lors de la génération de la réponse AI.",
      details: err?.message,
    });
  }
});

app.post("/api/estimate", async (req, res) => {
  const { projectType, features, timeline, description } = req.body || {};

  try {
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        estimation: {
          estimatedTimeframe: timeline?.includes('Urgent') ? '1 à 2 semaines' : '3 à 4 semaines',
          complexityLevel: 'Moyenne à Élevée',
          recommendedStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
          summary: `Estimation pour un projet ${projectType || 'Web'}: Architecture moderne, UI/UX réactive et livraison sécurisée.`
        }
      });
    }

    const prompt = `
En tant qu'expert technique et CEO chez Aaron Tech, évaluez avec précision le projet suivant:
- Type de projet: ${projectType || 'Application Web'}
- Fonctionnalités souhaitées: ${Array.isArray(features) ? features.join(', ') : (features || 'Non précisées')}
- Délai envisagé par le client: ${timeline || 'Standard'}
- Description / Notes: ${description || 'Non précisée'}

Fournissez un JSON strict sans texte avant ou après avec cette structure:
{
  "estimatedTimeframe": "ex: 2 à 4 semaines",
  "complexityLevel": "Facile | Moyenne | Élevée | Haute Performance",
  "recommendedStack": ["React", "TypeScript", "Node.js", "PostgreSQL"],
  "summary": "Résumé explicatif et conseils stratégiques en 2-3 phrases en français."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    let data;
    try {
      const cleanText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      data = JSON.parse(cleanText);
    } catch (parseErr) {
      console.error("Erreur parsing JSON estimation Gemini:", parseErr, text);
      data = {
        estimatedTimeframe: timeline?.includes('Urgent') ? '1 à 2 semaines' : '3 à 4 semaines',
        complexityLevel: (features && features.length > 3) ? 'Haute Performance' : 'Moyenne',
        recommendedStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
        summary: `Projet ${projectType || 'sur mesure'} avec une architecture modulaire et des fonctionnalités haut de gamme.`
      };
    }

    return res.json({ estimation: data });
  } catch (err: any) {
    console.error("Erreur estimation Gemini API:", err);
    return res.json({
      estimation: {
        estimatedTimeframe: timeline?.includes('Urgent') ? '1 à 2 semaines' : '3 à 4 semaines',
        complexityLevel: (features && features.length > 3) ? 'Haute Performance' : 'Moyenne',
        recommendedStack: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
        summary: `Estimation pour un projet de type ${projectType || 'Web'}. Notre équipe chez Aaron Tech garantit une livraison fluide, performante et adaptée.`
      }
    });
  }
});

// Vite server / Static fallback
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aaron Tech Server] Running on http://0.0.0.0:${PORT}`);
  });
}

start();
