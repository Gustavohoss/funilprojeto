'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { ProcessingSection } from "./processing-section";

type QuizSectionProps = {
  onComplete: (answers: Record<string, any>) => void;
  onBack: () => void;
};

const questions = [
  { id: 'daily_internet_access', text: 'Você possui acesso à internet pelo menos 30 min por dia?', options: ['Sim', 'Não'] },
  { id: 'tech_familiarity', text: 'Qual seu nível de familiaridade com tecnologia?', options: ['Iniciante', 'Intermediário', 'Avançado'] },
  { id: 'income_goal', text: 'Quanto você gostaria de ganhar extra por mês?', options: ['Até R$500', 'De R$500 a R$1.500', 'Acima de R$1.500'] },
  { id: 'learning_willingness', text: 'Você está disposto(a) a aprender novas habilidades para atingir seus objetivos?', options: ['Com certeza!', 'Talvez, dependendo do esforço', 'Não muito'] },
];

export function QuizSection({ onComplete, onBack }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);
    
    setIsTransitioning(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsTransitioning(false);
      } else {
        onComplete(newAnswers);
      }
    }, 2000);
  };

  if (isTransitioning) {
    return (
        <div className="w-full max-w-2xl flex flex-col gap-8 animate-fade-in">
            <ProcessingSection />
        </div>
    );
  }

  return (
    <div className="w-full max-w-2xl flex flex-col gap-8 animate-fade-in">
      <div className="w-full px-2">
        <p className="text-sm text-center text-slate-400 mb-2">{`Pergunta ${currentQuestionIndex + 1} de ${questions.length}`}</p>
        <Progress value={progress} className="h-2 bg-gray-800 [&>div]:bg-primary transition-all duration-300" />
      </div>

      <Card 
        key={currentQuestionIndex}
        className="glassmorphism w-full text-center animate-fade-in"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 font-headline">
          {currentQuestion.text}
        </h2>
        <div className="flex flex-col gap-4">
          {currentQuestion.options.map((option) => (
            <Button
              key={option}
              onClick={() => handleAnswer(option)}
              variant="outline"
              size="lg"
              className="w-full text-lg py-8 border-primary/30 hover:bg-primary/20 hover:text-white transition-all duration-200"
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>

      <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mx-auto">
        <ChevronLeft className="w-4 h-4" />
        Voltar
      </Button>
    </div>
  );
}
