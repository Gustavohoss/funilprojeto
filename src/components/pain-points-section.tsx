'use client';

import { Button } from '@/components/ui/button';
import { Settings, DollarSign, BrainCircuit, ArrowRight, ChevronLeft } from 'lucide-react';

type PainPointsSectionProps = {
  onComplete: () => void;
  onBack: () => void;
};

const painPoints = [
    { icon: <Settings className="w-10 h-10 md:w-12 md:h-12 text-primary" />, text: "Sente que está ficando para trás na tecnologia?" },
    { icon: <DollarSign className="w-10 h-10 md:w-12 md:h-12 text-primary" />, text: "Já tentou de tudo para ganhar dinheiro online e falhou?" },
    { icon: <BrainCircuit className="w-10 h-10 md:w-12 md:h-12 text-primary" />, text: "Acha que IA é muito complicado para você?" },
];

const GlassCard = ({ children }: { children: React.ReactNode }) => (
  <div className="relative w-full h-full p-4 sm:p-6 text-center bg-black/30 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg overflow-hidden">
    <div className="absolute top-0 left-0 w-[70%] h-[70%] border-t-2 border-l-2 border-primary/70 rounded-tl-2xl" />
    <div className="absolute bottom-0 right-0 w-[70%] h-[70%] border-b-2 border-r-2 border-primary/70 rounded-br-2xl" />
    <div className="relative z-10 flex flex-col items-center justify-start text-center gap-4 h-full">
      {children}
    </div>
  </div>
);


export function PainPointsSection({ onComplete, onBack }: PainPointsSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 max-w-3xl animate-fade-in">
        <h2 className="text-3xl md:text-5xl font-bold text-white font-headline [text-shadow:0_0_15px_hsl(var(--primary)/0.5)]">
            Você se identifica com algum destes problemas?
        </h2>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full mt-4">
            {painPoints.map((point, index) => (
                <GlassCard key={index}>
                    <div className="p-3 bg-primary/10 rounded-full">
                        {point.icon}
                    </div>
                    <p className="text-slate-200 text-xs sm:text-sm md:text-base flex-grow font-medium">{point.text}</p>
                </GlassCard>
            ))}
        </div>


        <div className="flex flex-col items-center gap-4 mt-8">
            <h3 className="text-xl md:text-2xl font-semibold text-white font-headline max-w-2xl [text-shadow:0_0_15px_hsl(var(--primary)/0.2)]">
                E se existisse um método simples, passo a passo, para transformar a IA em uma fonte de renda previsível?
            </h3>

            <Button
                onClick={onComplete}
                size="lg"
                className="mt-4 w-full max-w-md text-lg md:text-xl font-bold text-background rounded-full px-12 py-8 transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_20px_hsl(var(--primary)/0.7)] hover:shadow-[0_0_30px_hsl(var(--primary)/0.9)]"
            >
                <ArrowRight className="mr-3 w-6 h-6" />
                QUERO CONHECER A SOLUÇÃO
            </Button>
        </div>
        
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mx-auto mt-2">
            <ChevronLeft className="w-4 h-4" />
            Voltar
        </Button>
    </div>
  );
}
