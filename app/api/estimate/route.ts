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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { projectType, features, timeline, description, language } = body || {};

    const isEnglish = language === 'en';

    const fallbackEstimate = {
      estimatedTimeframe: timeline?.includes('Urgent') || timeline?.includes('< 2')
        ? (isEnglish ? '1 to 2 weeks' : '1 à 2 semaines')
        : (isEnglish ? '3 to 4 weeks' : '3 à 4 semaines'),
      estimatedBudget: isEnglish ? '$500 – $1,200 USD' : '500$ – 1 200$ USD',
      complexityLevel: Array.isArray(features) && features.length > 3
        ? (isEnglish ? 'High Performance / Enterprise' : 'Haute Performance')
        : (isEnglish ? 'Medium' : 'Moyenne'),
      recommendedStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
      summary: isEnglish
        ? `Tailored estimation for a ${projectType || 'Full-Stack'} project. Aaron Tech guarantees an ultra-responsive architecture, top-tier performance, and scalable delivery.`
        : `Estimation sur mesure pour un projet de type ${projectType || 'Application Web'}. Aaron Tech garantit une architecture ultra-réactive, performante et adaptée à vos ambitions.`,
    };

    const ai = getGenAI();
    if (!ai) {
      return NextResponse.json({ estimation: fallbackEstimate });
    }

    const featureList = Array.isArray(features) ? features.join(', ') : (features || 'Non spécifié');

    const prompt = `
En tant qu'expert technique, Architecte Logiciel et CEO chez Aaron Tech, évaluez avec précision le projet suivant pour produire un devis estimatif réaliste:
- Type de projet: ${projectType || 'Application Web'}
- Fonctionnalités souhaitées: ${featureList}
- Délai envisagé par le client: ${timeline || 'Standard'}
- Description / Notes: ${description || 'Non précisée'}
- Langue de réponse souhaitée: ${isEnglish ? 'Anglais' : 'Français'}

Fournissez un JSON strict sans markdown, sans \`\`\`json, respectant exactement ce schéma:
{
  "estimatedTimeframe": "${isEnglish ? 'e.g. 2 to 4 weeks' : 'ex: 2 à 4 semaines'}",
  "estimatedBudget": "${isEnglish ? 'e.g. $600 – $1,400 USD' : 'ex: 600$ – 1 400$ USD'}",
  "complexityLevel": "${isEnglish ? 'Accessible | Moderate | High Performance | Enterprise' : 'Accessible | Modérée | Haute Performance | Entreprise'}",
  "recommendedStack": ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
  "summary": "${isEnglish ? 'Strategic summary and technical recommendations in 2-3 sentences.' : 'Résumé explicatif et conseils stratégiques en 2-3 phrases en français.'}"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text || '{}';
    let data;
    try {
      const cleanText = text.replace(/```json/gi, '').replace(/```/g, '').trim();
      data = JSON.parse(cleanText);
      if (!data.estimatedTimeframe || !data.complexityLevel || !data.recommendedStack) {
        data = fallbackEstimate;
      }
    } catch (parseErr) {
      console.warn('Fallback due to JSON parse error:', parseErr);
      data = fallbackEstimate;
    }

    return NextResponse.json({ estimation: data });
  } catch (err: any) {
    console.error('Erreur Route Estimator:', err);
    return NextResponse.json({
      estimation: {
        estimatedTimeframe: '3 à 4 semaines',
        complexityLevel: 'Moyenne',
        recommendedStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
        summary: "Projet sur mesure avec une architecture moderne, fluide et scalable conçue par Aaron Tech.",
      },
    });
  }
}
