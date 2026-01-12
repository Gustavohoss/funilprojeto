import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ProceduralGroundBackground from '@/components/procedural-ground-background';

export const metadata: Metadata = {
  title: 'AI Profit Decoder',
  description: 'Descubra se seu perfil é compatível para lucrar com Inteligência Artificial.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <ProceduralGroundBackground />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
