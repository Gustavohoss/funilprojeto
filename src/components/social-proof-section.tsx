'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

type SocialProofSectionProps = {
  onComplete: () => void;
};

export function SocialProofSection({ onComplete }: SocialProofSectionProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000); // Avança para a próxima tela após 5 segundos

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 max-w-lg animate-fade-in">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary mb-4"></div>
        <h2 className="text-2xl md:text-3xl font-bold text-white font-headline">
            Verificando resultados de outros membros...
        </h2>

        <div className="relative w-full aspect-[9/16] max-w-xs overflow-hidden rounded-xl shadow-lg border-2 border-primary/30 mt-4">
             <Image
                src="https://s3.typebot.io/public/workspaces/cmj62bxvv000fju04wwudfwgk/typebots/u2v6f22bvdar3qy5qy44pti8/blocks/cc3wq86b2w6y9pr7ofjz7z5m?v=1768273326453"
                alt="Prova social de resultado"
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
            />
        </div>
      
        <div className="w-full max-w-xs mt-4">
          <Progress value={100} className="h-2 bg-gray-800 [&>div]:bg-primary animate-loading-bar-slow" />
        </div>
        <p className="text-sm text-slate-400">Aguarde, sua oferta está sendo preparada...</p>
    </div>
  );
}
