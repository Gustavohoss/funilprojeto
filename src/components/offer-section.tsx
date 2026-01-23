'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Check, Zap, ChevronLeft } from "lucide-react";
import { CountdownTimer } from "./countdown-timer";
import type { SimulatedAnalysisOutput } from "@/app/page";

type OfferSectionProps = {
  result: SimulatedAnalysisOutput | null;
  onBack: () => void;
};

const kitDeAcessoRapido = [
  'O Manual do Caçador: Como achar empresas sem site no Google Maps em 2 minutos.',
  'O Script "Copia e Cola": A mensagem exata de WhatsApp que faz o dono da empresa te responder na hora.',
  'O Segredo da IA: Acesso à aula onde mostro a ferramenta que cria o site sozinha (O seu SaaS).',
];


export function OfferSection({ onBack }: OfferSectionProps) {

  const handlePayment = () => {
    // Hotmart checkout link placeholder
    window.location.href = 'https://pay.hotmart.com/EXAMPLE';
  };


  return (
    <div className="w-full flex flex-col items-center text-center gap-4 max-w-2xl animate-fade-in">
        <div className="bg-primary/20 text-primary font-bold py-1 px-4 rounded-full flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            PERFIL APROVADO
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white font-headline leading-tight">
            Você está apto a usar o Criador de Sites com IA.
        </h1>
        <p className="text-lg text-slate-300 max-w-xl">
            Você não precisa pagar R$ 5.000 em um curso de Web Design. Preparamos o 'Kit de Acesso Rápido' com tudo que você precisa para copiar, colar e fazer sua primeira venda de R$ 500,00 ainda hoje.
        </p>
        
        <Card className="relative overflow-hidden bg-slate-900/50 backdrop-blur-xl border-2 border-primary/50 p-6 md:p-8 rounded-2xl shadow-lg w-full text-left mt-4 shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
            <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-20" style={{backgroundSize: '40px 40px'}}></div>
            <div className="relative z-10 flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">O Que Você Recebe:</h2>

                <div className="space-y-3 mb-6">
                    {kitDeAcessoRapido.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                            <p className="flex-1 text-slate-300">{item}</p>
                        </div>
                    ))}
                </div>

                <div className="w-full animate-fade-in space-y-2 mt-4 text-center">
                    <div className="bg-gradient-to-t from-primary/10 to-transparent p-6 rounded-lg border border-primary/20">
                        <p className="text-slate-400 line-through text-xl">De R$ 97,00</p>
                        <p className="text-white font-bold"><span className="text-5xl">R$ 19,90</span></p>
                        <p className="text-slate-300 text-sm">Taxa única de cadastro.</p>
                    </div>

                    <Button 
                        size="lg" 
                        onClick={handlePayment}
                        className="w-full text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
                    >
                        <Zap className="w-5 h-5 -ml-2 mr-2" />
                        QUERO GANHAR R$ 500 HOJE
                    </Button>
                    <p className="text-slate-300 text-sm">Oferta válida pelos próximos 10 minutos.</p>
                    <CountdownTimer />
                </div>
            </div>
        </Card>
        
        <Button variant="ghost" onClick={onBack} className="mt-4 flex items-center gap-2 text-slate-400 hover:text-white mx-auto">
            <ChevronLeft className="w-4 h-4" />
            Refazer o teste
        </Button>
    </div>
  );
}
