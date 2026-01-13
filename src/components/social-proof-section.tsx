'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

type SocialProofSectionProps = {
  onComplete: () => void;
};

export function SocialProofSection({ onComplete }: SocialProofSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 max-w-lg animate-fade-in">
        <h2 className="text-2xl md:text-4xl font-bold text-white font-headline">
            Veja o que nossos membros estão alcançando...
        </h2>

        <div className="relative w-full aspect-[9/16] max-w-xs overflow-hidden rounded-xl shadow-lg border-2 border-primary/30 mt-4 shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
             <Image
                src="https://s3.typebot.io/public/workspaces/cmj62bxvv000fju04wwudfwgk/typebots/u2v6f22bvdar3qy5qy44pti8/blocks/cc3wq86b2w6y9pr7ofjz7z5m?v=1768273326453"
                alt="Prova social de resultado de um membro do Protocolo Renda IA"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
            />
        </div>
      
        <p className="text-md text-slate-300">Você está a um passo de ter acesso à mesma oportunidade.</p>

        <Button
            onClick={onComplete}
            size="lg"
            className="w-full max-w-xs text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
        >
            Quero começar agora!
        </Button>
    </div>
  );
}
