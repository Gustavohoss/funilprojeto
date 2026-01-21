'use client';

import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  onStart: () => void;
};

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 max-w-3xl animate-fade-in">
      <h1 className="text-4xl md:text-6xl font-bold text-white font-headline leading-tight [text-shadow:0_0_15px_hsl(var(--primary)/0.5)] mt-12">
        Aviso: A IA está criando uma nova classe de milionários. <span className="text-primary">A questão é: você vai assistir ou vai participar?</span>
      </h1>
      <p className="text-lg md:text-xl text-slate-300">
        Se você sente que trabalha muito mas não vê o resultado que merece, e teme ficar para trás na maior revolução tecnológica da história, nós entendemos você. Nosso sistema foi projetado para isso, mas não funciona para todos. Responda a 4 perguntas e descubra se seu perfil é compatível.
      </p>
      <Button 
        onClick={onStart} 
        size="lg" 
        className="mt-4 text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
      >
        DESCUBRA SE VOCÊ TEM O PERFIL (É GRÁTIS)
      </Button>
    </div>
  );
}
