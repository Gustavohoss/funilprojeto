'use client';

import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onStart: () => void;
};

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 max-w-3xl animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-bold text-white font-headline leading-tight [text-shadow:0_0_15px_hsl(var(--primary)/0.5)] mt-12">
        O Futuro da Renda é Artificial. <span className="text-primary">Domine a IA Agora</span> ou Fique Para Trás.
      </h1>
      <p className="text-lg md:text-xl text-slate-300">
        Faça a análise de aptidão e descubra se nosso sistema <span className="font-bold text-white">"Cliente Infinito AI"</span> é compatível com seu perfil.
      </p>
      <Button 
        onClick={onStart} 
        size="lg" 
        className="mt-4 text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
      >
        INICIAR ANÁLISE DE PERFIL
      </Button>
    </div>
  );
}
