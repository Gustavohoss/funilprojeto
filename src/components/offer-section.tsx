'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, BadgeCheck, ChevronLeft, Cpu, BookOpen, Users, DollarSign, Gift, Zap } from "lucide-react";
import { CountdownTimer } from "./countdown-timer";
import type { SimulatedAnalysisOutput } from "@/app/page";

type OfferSectionProps = {
  result: SimulatedAnalysisOutput | null;
  onBack: () => void;
};

const unlockedContent = [
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: 'Protocolo Renda IA: O Passo a Passo',
    description: 'O mapa exato para fechar seus primeiros clientes de 4 dígitos em tempo recorde, do zero absoluto à renda previsível.',
    value: 297,
    isBonus: false,
  },
  {
    icon: <Cpu className="w-6 h-6 text-primary" />,
    title: "BÔNUS #1: Aplicativo 'Cliente Infinito AI'",
    description: 'Nosso Mecanismo Único que encontra clientes desesperados por soluções e constrói o que eles precisam com IA em minutos. Isso é o que nos torna diferentes.',
    value: 497,
    isBonus: true,
  },
  {
    icon: <DollarSign className="w-6 h-6 text-primary" />,
    title: 'Módulo: Scripts de Conversão Validados',
    description: 'As palavras exatas para fechar contratos de +R$1.000, mesmo que você se considere péssimo em vendas. Copie, cole e converta.',
    value: 197,
    isBonus: false,
  },
  {
    icon: <Users className="w-6 h-6 text-primary" />,
    title: 'BÔNUS #2: Acesso à Comunidade VIP',
    description: 'O lugar onde as dúvidas são respondidas em minutos e as parcerias de alto nível nascem. Você nunca mais estará sozinho.',
    value: 197,
    isBonus: true,
  },
];

const totalValue = unlockedContent.reduce((acc, item) => acc + item.value, 0);


export function OfferSection({ result, onBack }: OfferSectionProps) {
  const [priceRevealed, setPriceRevealed] = useState(false);

  const score = result?.compatibilityScore ?? 92;

  const handlePayment = () => {
    // Hotmart checkout link placeholder
    window.location.href = 'https://pay.hotmart.com/EXAMPLE';
  };


  return (
    <div className="w-full flex flex-col items-center text-center gap-4 max-w-2xl animate-fade-in">
        <div className="bg-primary/20 text-primary font-bold py-1 px-4 rounded-full flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            COMPATIBILIDADE: {score}%
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white font-headline leading-tight">
            SEU ACESSO FOI PRÉ-APROVADO!
        </h1>
        
        <Card className="relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border-2 border-primary/50 p-6 md:p-8 rounded-2xl shadow-lg w-full text-center mt-4 shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
            <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-20" style={{backgroundSize: '40px 40px'}}></div>
            <div className="relative z-10 flex flex-col items-center">
                <div className="p-4 bg-primary/10 rounded-full border-2 border-primary/50 mb-4 animate-pulse-subtle">
                    <BadgeCheck className="w-12 h-12 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Você passou na análise.</h2>
                <p className="text-slate-300 max-w-md mx-auto mb-6">Isso significa que seu perfil é ideal para lucrar com o nosso Mecanismo Único. Veja o que você está prestes a destravar:</p>
                
                <div className="w-full text-left space-y-4 mb-6">
                    {unlockedContent.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 text-slate-300 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-primary/50 transition-all">
                            <div className="p-3 bg-primary/10 rounded-full mt-1 border border-primary/20">{item.icon}</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-white leading-tight">{item.title}</h4>
                                    <span className="text-sm text-slate-400 line-through whitespace-nowrap ml-4">R$ {item.value.toFixed(2).replace('.', ',')}</span>
                                </div>
                                <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                                {item.isBonus && (
                                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/20 px-2 py-1 rounded-full">
                                        <Gift className="w-3 h-3" />
                                        BÔNUS ESPECIAL
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>


                {priceRevealed ? (
                    <div className="w-full animate-fade-in space-y-6">
                        <p className="text-slate-200 text-lg">Seu acesso ao sistema completo foi liberado com <span className="font-bold text-primary">98% de desconto</span> por tempo limitado.</p>

                        <div className="bg-gradient-to-t from-primary/10 to-transparent p-6 rounded-lg border border-primary/20">
                            <p className="text-slate-400 line-through text-xl">De R$ {totalValue.toFixed(2).replace('.', ',')}</p>
                            <p className="text-white font-bold"><span className="text-5xl">R$ 19,90</span></p>
                            <p className="text-slate-300 text-sm">Pagamento único. Acesso vitalício.</p>
                        </div>
                        

                        <Button 
                            size="lg" 
                            onClick={handlePayment}
                            className="w-full text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                        >
                            <Zap className="w-5 h-5 -ml-2 mr-2" />
                            SIM, QUERO GARANTIR MINHA VAGA AGORA!
                        </Button>
                        <CountdownTimer />
                    </div>
                ) : (
                  <div className="w-full space-y-4">
                      <div className="text-center">
                        <p className="text-slate-400">Valor total de tudo que você recebe:</p>
                        <p className="text-2xl font-bold text-slate-400 line-through">R$ {totalValue.toFixed(2).replace('.', ',')}</p>
                      </div>
                      <Button 
                          size="lg" 
                          onClick={() => setPriceRevealed(true)}
                          className="w-full text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                      >
                          QUERO VER MEU DESCONTO DE FUNDADOR
                      </Button>
                  </div>
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
