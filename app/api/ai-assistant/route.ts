import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aaron-tech-portfolio',
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

Répondez de manière professionnelle, conviviale, concise et enthousiaste en français (ou dans la langue de l'utilisateur si demandé). Mettez toujours en valeur le leadership, l'innovation et l'expertise technique d'Aaron Tech.
`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body.message !== 'string' || !body.message.trim()) {
      return NextResponse.json(
        { error: 'Message requis et non vide.' },
        { status: 400 }
      );
    }

    const { message, history } = body;
    const ai = getGenAI();

    if (!ai) {
      return NextResponse.json({
        reply: `Bonjour ! Je suis l'assistant d'Aaron Tech. Aaron Tech est CEO & Cofondateur d'AXIUM et Développeur Full-Stack expert à Goma (RDC). Pour toute collaboration directe, vous pouvez le contacter à lumooaaron@gmail.com ou au +243 900 16 36 58.`,
      });
    }

    const formattedHistory = Array.isArray(history)
      ? history
          .slice(-6)
          .map((h: { role?: string; content?: string }) => `${h.role || 'user'}: ${h.content || ''}`)
          .join('\n')
      : '';

    const contents = `${AARON_TECH_SYSTEM_PROMPT}\n\nHistorique récent:\n${formattedHistory}\n\nQuestion de l'utilisateur: ${message.trim()}`;

    // Use gemini-3.6-flash as instructed by current Gemini API runtime
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
    });

    const reply = response.text || "Désolé, je n'ai pas pu générer de réponse pour le moment.";
    return NextResponse.json({ reply });
  } catch (err: any) {
    console.error('Erreur Gemini AI Assistant Route:', err);
    // Return friendly persona fallback so user never gets broken chatbot
    return NextResponse.json({
      reply: `Bonjour ! Je suis Aaron AI. Aaron Tech est CEO & Cofondateur d'AXIUM et Développeur Full-Stack expert basé à Goma (RDC), créateur de solutions phares comme Noboté (système de vote en temps réel) et AXIUMarket. Pour échanger sur vos projets ou tarifs, écrivez-lui à lumooaaron@gmail.com ou contactez-le sur WhatsApp au +243 900 16 36 58.`,
    });
  }
}
