'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BookOpen, Target, BrainCircuit, Mic, ArrowRight } from 'lucide-react';

type MethodologySectionProps = {
  onComplete: () => void;
};

const methodologies = [
  {
    icon: <Target className="w-8 h-8 text-primary" />,
    title: 'AIDA',
    description: 'Capturamos Atenção, geramos Interesse, construímos um Desejo incontrolável e te guiamos para a Ação.',
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: 'Mecanismo Único',
    description: 'Não vendemos apenas uma solução, nós revelamos o "porquê" ela funciona — o nosso segredo para resultados inevitáveis.',
  },
  {
    icon: <Mic className="w-8 h-8 text-primary" />,
    title: 'Breakthrough Advertising',
    description: 'Falamos a língua do seu cliente, entendendo o nível de consciência dele para que a nossa mensagem seja sempre relevante e poderosa.',
  },
  {
    icon: <BookOpen className="w-8 h-8 text-primary" />,
    title: 'The Boron Letters',
    description: 'Usamos os princípios da resposta direta para criar uma oferta tão clara e pessoal que a única resposta possível é "sim".',
  },
];

export function MethodologySection({ onComplete }: MethodologySectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 max-w-4xl animate-fade-in">
      <h2 className="text-3xl md:text-5xl font-bold text-white font-headline [text-shadow:0_0_15px_hsl(var(--primary)/0.5)]">
        A Ciência Por Trás do Protocolo
      </h2>
      <p className="text-lg text-slate-300 max-w-2xl">
        Nossos resultados não são por acaso. Eles são fruto de um sistema construído sobre os pilares mais sólidos da persuasão e vendas. É por isso que funciona.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">
        {methodologies.map((method, index) => (
          <Card key={index} className="bg-slate-900/40 backdrop-blur-md border border-primary/20 p-6 rounded-2xl text-left flex items-start gap-4">
            <div className="p-3 bg-primary/10 rounded-full border border-primary/20">
              {method.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{method.title}</h3>
              <p className="text-slate-400 mt-1">{method.description}</p>
            </div>
          </Card>
        ))}
      </div>
      
      <p className="text-md text-slate-300 mt-4">Agora que você entende a nossa base, está na hora de ver o que este sistema pode fazer por você.</p>

      <Button
        onClick={onComplete}
        size="lg"
        className="w-full max-w-md text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
      >
        DESTRAVAR MINHA OFERTA
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </div>
  );
}
