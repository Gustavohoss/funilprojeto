'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, BadgeCheck, ChevronLeft, CheckCircle2 } from "lucide-react";
import { CountdownTimer } from "./countdown-timer";
import type { AnalyzeProfileAptitudeOutput } from "@/ai/flows/analyze-profile-aptitude";

type OfferSectionProps = {
  result: AnalyzeProfileAptitudeOutput | null;
  onBack: () => void;
};

const unlockedModules = [
    { icon: <CheckCircle2 className="text-primary w-5 h-5" />, text: "Módulo 1: A Mentalidade Renda IA" },
    { icon: <CheckCircle2 className="text-primary w-5 h-5" />, text: "Módulo 2: Encontrando Clientes de Alto Valor" },
    { icon: <CheckCircle2 className="text-primary w-5 h-5" />, text: "Módulo 3: Construindo Sites Premium com IA em 27 Minutos" },
    { icon: <CheckCircle2 className="text-primary w-5 h-5" />, text: "Módulo 4: Negociação e Fechamento de Contratos de R$1.000+" },
    { icon: <CheckCircle2 className="text-primary w-5 h-5" />, text: "Bônus: Comunidade Exclusiva de Alunos" },
];

export function OfferSection({ result, onBack }: OfferSectionProps) {
  const [priceRevealed, setPriceRevealed] = useState(false);
  const score = result?.compatibilityScore ?? 92;
  const feedback = result?.feedback ?? "Seu perfil tem alta compatibilidade com nosso método. Você está pronto para começar a lucrar com IA.";

  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 max-w-2xl animate-fade-in">
        <div className="bg-primary/20 text-primary font-bold py-1 px-4 rounded-full flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            COMPATIBILIDADE: {score}%
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white font-headline leading-tight">
            ACESSO APROVADO!
        </h1>
        
        <Card className="relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border-2 border-primary/50 p-6 md:p-8 rounded-2xl shadow-lg w-full text-center mt-4 shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
            <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-20" style={{backgroundSize: '40px 40px'}}></div>
            <div className="relative z-10 flex flex-col items-center">
                <div className="p-4 bg-primary/10 rounded-full border-2 border-primary/50 mb-4 animate-pulse-subtle">
                    <BadgeCheck className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Seu perfil foi selecionado.</h2>
                <p className="text-slate-300 max-w-md mx-auto mb-6">{feedback}</p>
                
                <div className="bg-white/5 border border-primary/20 rounded-lg p-4 text-left w-full max-w-sm mx-auto mb-6">
                    <h3 className="font-bold text-white mb-3 text-center">O que você desbloqueou:</h3>
                    <ul className="space-y-2">
                        {unlockedModules.map((item, index) => (
                            <li key={index} className="flex items-center gap-3 text-slate-300">
                                {item.icon}
                                <span>{item.text}</span>
                            </li>
                        ))}
                    </ul>
                </div>


                {priceRevealed ? (
                    <div className="w-full animate-fade-in space-y-6">
                        <p className="text-slate-200 text-lg">O acesso ao método completo foi liberado com <span className="font-bold text-primary">95% de desconto</span> por tempo limitado.</p>

                        <div>
                            <p className="text-slate-400 line-through">De R$ 197</p>
                            <p className="text-5xl font-bold text-white">por apenas R$ 9,90</p>
                        </div>

                        <Button 
                            size="lg" 
                            className="w-full text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                        >
                            RESGATAR ACESSO AGORA
                        </Button>
                        <CountdownTimer />
                    </div>
                ) : (
                    <Button 
                        size="lg" 
                        onClick={() => setPriceRevealed(true)}
                        className="w-full text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
                    >
                        REVELAR MINHA OFERTA ESPECIAL
                    </Button>
                )}
            </div>
        </Card>

        <Button variant="ghost" onClick={onBack} className="mt-4 flex items-center gap-2 text-slate-400 hover:text-white mx-auto">
            <ChevronLeft className="w-4 h-4" />
            Refazer o teste
        </Button>
    </div>
  );
}
