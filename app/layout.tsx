import type { Metadata, Viewport } from 'next';
import { Montserrat, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { Toaster } from 'sonner';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

export const viewport: Viewport = {
  themeColor: '#08140B',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://aarontech.dev'),
  title: {
    default: 'Aaron Tech — CEO AXIUM, Développeur Full-Stack & Entrepreneur Tech',
    template: '%s | Aaron Tech',
  },
  description:
    "Portfolio officiel de Aaron Tech (Aaron Lumoo), CEO & Cofondateur d'AXIUM. Développeur Full-Stack expert en React, TypeScript, Node.js & Intelligence Artificielle. Découvrez mes projets phares (Noboté, Eclypse, GenioTech, Rartech) et interagissez avec mon Copilot IA.",
  keywords: [
    'Aaron Tech',
    'Aaron Lumoo',
    'AXIUM',
    'AXIUM TECH',
    'Développeur Full-Stack',
    'Développeur Web Goma RDC',
    'React',
    'Next.js',
    'Node.js',
    'TypeScript',
    'Entrepreneur Tech',
    'Portfolio Développeur',
    'Noboté',
    'Eclypse',
    'GenioTech',
    'Rartech',
    'Gemini AI',
  ],
  authors: [{ name: 'Aaron Tech', url: 'https://aarontech.dev' }],
  creator: 'Aaron Tech',
  alternates: {
    canonical: 'https://aarontech.dev/',
  },
  icons: {
    icon: '/logos/at2.png',
    shortcut: '/logos/at2.png',
    apple: '/logos/at2.png',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://aarontech.dev/',
    siteName: 'Aaron Tech Portfolio',
    title: 'Aaron Tech — CEO AXIUM & Développeur Full-Stack',
    description:
      'Portfolio officiel de Aaron Tech : CEO AXIUM, Développeur Full-Stack & Innovateur Tech. Explorez mes projets et testez mon Assistant AI interactif.',
    images: [
      {
        url: '/bg/atech2.png',
        width: 1200,
        height: 630,
        alt: 'Aaron Tech - CEO AXIUM & Développeur Full-Stack',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aaron Tech — CEO AXIUM & Développeur Full-Stack',
    description:
      'Découvrez le portfolio officiel de Aaron Tech (CEO AXIUM), ses projets phares et interagissez avec son Copilot IA Gemini.',
    images: ['/bg/atech2.png'],
    creator: '@atech7h',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://aarontech.dev/#person',
      name: 'Aaron Tech',
      alternateName: 'Aaron Lumoo',
      jobTitle: 'CEO & Cofondateur',
      worksFor: {
        '@type': 'Organization',
        name: 'AXIUM',
        alternateName: 'AXIUM TECH',
      },
      description:
        "Leader technologique, CEO & Cofondateur d'AXIUM, Développeur Full-Stack et Entrepreneur Tech.",
      knowsAbout: [
        'Full-Stack Web Development',
        'Next.js',
        'React',
        'TypeScript',
        'Node.js',
        'Artificial Intelligence',
        'Software Architecture',
        'Startup Leadership',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://aarontech.dev/#website',
      url: 'https://aarontech.dev/',
      name: 'Aaron Tech Portfolio',
      description: 'Portfolio officiel de Aaron Tech, CEO AXIUM et Développeur Full-Stack.',
      publisher: {
        '@id': 'https://aarontech.dev/#person',
      },
      inLanguage: 'fr-FR',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#08140B] text-[#F3F4F6] selection:bg-[#a3e635] selection:text-[#08140B]">
        <LanguageProvider>{children}</LanguageProvider>
        <Toaster
          position="bottom-right"
          theme="dark"
          toastOptions={{
            style: {
              background: '#091B0E',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#F3F4F6',
              borderRadius: '16px',
              fontSize: '13px',
              fontFamily: 'var(--font-sans)',
            },
          }}
        />
      </body>
    </html>
  );
}
