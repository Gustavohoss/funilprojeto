'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { XCircle, KeyRound, ChevronLeft } from 'lucide-react';

type PainPointsSectionProps = {
  onComplete: () => void;
  onBack: () => void;
};

const painPoints = [
    { icon: <XCircle className="text-destructive w-6 h-6 [text-shadow:0_0_8px_hsl(var(--destructive))]" />, text: "Sente que está ficando para trás na tecnologia?" },
    { icon: <XCircle className="text-destructive w-6 h-6 [text-shadow:0_0_8px_hsl(var(--destructive))]" />, text: "Já tentou de tudo para ganhar dinheiro online e falhou?" },
    { icon: <XCircle className="text-destructive w-6 h-6 [text-shadow:0_0_8px_hsl(var(--destructive))]" />, text: "Acha que IA é muito complicado para você?" },
]

export function PainPointsSection({ onComplete, onBack }: PainPointsSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 max-w-2xl animate-fade-in">
        <h2 className="text-3xl md:text-5xl font-bold text-white font-headline [text-shadow:0_0_15px_hsl(var(--primary)/0.5)]">
            Você se identifica com algum destes problemas?
        </h2>

        <Card className="bg-slate-900/30 backdrop-blur-md border border-destructive/20 p-6 md:p-8 rounded-2xl shadow-lg w-full text-left space-y-4 shadow-[0_0_20px_hsl(var(--destructive)/0.25)]">
            {painPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-4 text-slate-300 text-lg">
                    {point.icon}
                    <span>{point.text}</span>
                </div>
            ))}
        </Card>

        <div className="flex flex-col items-center gap-4 animate-fade-in mt-6">
            <h3 className="text-2xl md:text-4xl font-bold text-primary font-headline">
                E se existisse um método simples, passo a passo, para transformar a IA em uma fonte de renda previsível?
            </h3>

            <Button
                onClick={onComplete}
                size="lg"
                className="mt-4 w-full max-w-md text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
            >
                QUERO CONHECER A SOLUÇÃO
                <KeyRound className="ml-2 w-6 h-6" />
            </Button>
        </div>
        
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mx-auto mt-4">
            <ChevronLeft className="w-4 h-4" />
            Voltar
        </Button>
    </div>
  );
}
