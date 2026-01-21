'use client';

import { useEffect, useState } from "react";
import { HoloPulse } from "@/components/ui/holo-pulse-loader";

const messages = [
    "Analisando seu perfil...",
    "Cruzando dados com perfis de sucesso...",
    "Verificando compatibilidade com o Mecanismo...",
    "Calculando seu potencial de ganhos..."
];

export function ProcessingSection() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
        }, 1200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center text-center gap-8 animate-fade-in w-full h-full">
            <HoloPulse messages={messages} currentMessageIndex={messageIndex} />
        </div>
    );
}
