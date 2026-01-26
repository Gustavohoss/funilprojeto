'use client';

import type { SimulatedAnalysisOutput } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, ArrowRight } from 'lucide-react';

type AnalysisResultSectionProps = {
  result: SimulatedAnalysisOutput | null;
  onComplete: () => void;
};

export function AnalysisResultSection({ result, onComplete }: AnalysisResultSectionProps) {
  const score = result?.compatibilityScore ?? 0;

  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 max-w-lg animate-fade-in w-full">
        <Card className="bg-slate-900/30 backdrop-blur-md border border-primary/20 p-6 md:p-8 rounded-2xl shadow-lg w-full">
            <div className="flex flex-col items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full border-2 border-primary/30 animate-pulse-subtle">
                    <CheckCircle className="w-14 h-14 md:w-16 md:h-16 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-headline">Análise Concluída</h2>
                <p className="text-base md:text-lg text-slate-300">Seu perfil é <span className="font-bold text-primary">{score}% compatível</span> com o nosso método.</p>
                <p className="text-slate-400 max-w-md text-sm md:text-base">Isso é raro. Significa que você tem o que é preciso para transformar IA em renda. Agora, veja a prova de que você não está sozinho.</p>
                <Button
                    onClick={onComplete}
                    size="lg"
                    className="w-full mt-4 text-base md:text-lg font-bold bg-primary text-primary-foreground rounded-full px-8 py-6 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                >
                    VER A PROVA (NÃO ACREDITE, VEJA)
                    <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
            </div>
        </Card>
    </div>
  );
}
