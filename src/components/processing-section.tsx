'use client';

import { useEffect, useState } from "react";

const messages = [
    "Analisando perfil...",
    "Cruzando dados com oportunidades de IA...",
    "Verificando compatibilidade...",
    "Finalizando análise de aptidão..."
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
        <div className="flex flex-col items-center justify-center text-center gap-8 animate-fade-in">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
            <h2 className="text-2xl md:text-3xl font-bold text-white font-headline transition-opacity duration-300">
                {messages[messageIndex]}
            </h2>
            <div className="w-full max-w-md bg-gray-800/50 rounded-full h-2.5 mt-4 overflow-hidden relative">
                <div className="bg-primary h-2.5 rounded-full absolute left-0 top-0 bottom-0 animate-loading-bar"></div>
            </div>
        </div>
    );
}
