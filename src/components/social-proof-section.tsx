'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

type SocialProofSectionProps = {
  onComplete: () => void;
};

export function SocialProofSection({ onComplete }: SocialProofSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-8 max-w-lg animate-fade-in">
        <h2 className="text-2xl md:text-4xl font-bold text-white font-headline [text-shadow:0_0_15px_hsl(var(--primary)/0.5)]">
            Veja o que um perfil como o seu já conquistou.
        </h2>

        <div className="w-full max-w-xs overflow-hidden rounded-xl shadow-lg border-2 border-primary/30 mt-4 shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
             <Image
                src="https://s3.typebot.io/public/workspaces/cmj62bxvv000fju04wwudfwgk/typebots/u2v6f22bvdar3qy5qy44pti8/blocks/cc3wq86b2w6y9pr7ofjz7z5m?v=1768273326453"
                alt="Prova social de resultado de um membro do Protocolo Renda IA"
                width={400}
                height={866}
                layout="responsive"
                objectFit="contain"
                className="rounded-lg"
            />
        </div>
      
        <p className="text-md text-slate-300">Isso não é sorte, é método. Enquanto você hesita, outros com seu potencial já lucram. Vai continuar só observando?</p>

        <Button
            onClick={onComplete}
            size="lg"
            className="w-full max-w-xs text-lg md:text-xl font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 transform hover:scale-105"
        >
            DESTRAVAR MINHA OFERTA
            <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
    </div>
  );
}
