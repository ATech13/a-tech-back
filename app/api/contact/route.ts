import { NextRequest, NextResponse } from 'next/server';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

const contactMessages: ContactMessage[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: 'Données de formulaire invalides.' },
        { status: 400 }
      );
    }

    const { name, email, message } = body;

    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { error: 'Tous les champs (nom, email, message) sont obligatoires.' },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    const newMessage: ContactMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: trimmedName.slice(0, 100),
      email: trimmedEmail.slice(0, 100),
      message: trimmedMessage.slice(0, 2000),
      timestamp: new Date().toISOString(),
    };

    contactMessages.push(newMessage);
    console.log('[Contact Submission]', {
      id: newMessage.id,
      name: newMessage.name,
      email: newMessage.email,
      timestamp: newMessage.timestamp,
    });

    return NextResponse.json({
      success: true,
      message: 'Votre message a été transmis à Aaron Tech avec succès !',
      data: {
        id: newMessage.id,
        timestamp: newMessage.timestamp,
      },
    });
  } catch (err: any) {
    console.error('Erreur Route Contact:', err);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors du traitement de votre message.' },
      { status: 500 }
    );
  }
}
