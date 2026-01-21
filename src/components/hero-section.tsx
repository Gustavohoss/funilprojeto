'use client';

import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onStart: () => void;
};

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 max-w-3xl animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-bold text-white font-headline leading-tight [text-shadow:0_0_15px_hsl(var(--primary)/0.5)] mt-12">
        PROTOCOLO RENDA IA: <span className="text-primary">Aprenda a Gerar Renda</span> com Inteligência Artificial
      </h1>
      <p className="text-lg md:text-xl text-slate-300">
        Faça o teste de aptidão oficial
      </p>
      <Button 
        onClick={onStart} 
        size="lg" 
        className="mt-4 text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
      >
        INICIAR ANÁLISE DE PERFIL
      </Button>
    </div>
  );
}
