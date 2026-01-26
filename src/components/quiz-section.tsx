'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card as ShadCard } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

type QuizSectionProps = {
  onComplete: (answers: Record<string, any>) => void;
  onBack: () => void;
};

const questions = [
  { 
    id: 'concept_understanding', 
    text: 'O sistema que vamos analisar é simples: você usará nossa IA para criar sites para empresas e cobrar por isso, ficando com 100% do lucro. O modelo de negócio está claro para você?', 
    options: [
      'Sim, entendi e quero continuar.', 
      'Parece bom, quero saber mais.'
    ] 
  },
  { 
    id: 'experience_level', 
    text: 'Nossa IA faz 100% do trabalho técnico (códigos e design). Qual é o seu nível atual de experiência com criação de sites?', 
    options: [
      'Sou totalmente iniciante (Nunca criei um site).', 
      'Tenho uma noção básica.', 
      'Já trabalho na área.'
    ] 
  },
  { 
    id: 'market_awareness', 
    text: 'Uma pesquisa recente mostrou que 70% das empresas locais (Pizzarias, Advogados, Clínicas) não têm site profissional. Você sabia que essas empresas pagam de R$ 600 a R$ 1.500 por um serviço simples?', 
    options: [
      'Não sabia, estou chocado com o valor.', 
      'Desconfiava, mas não sabia como cobrar.', 
      'Sim, vejo isso todo dia no meu bairro.'
    ] 
  },
  { 
    id: 'work_hours', 
    text: 'Quantas horas por dia você pode dedicar para construir sua nova fonte de renda?',
    options: [
      'Menos de 1h por dia (Renda Extra).',
      '1h a 3h por dia (Transição de carreira).',
      'Tempo integral (Quero viver disso).'
    ]
  },
  { 
    id: 'mindset_check', 
    text: 'O mercado está cheio de amadores, mas seus resultados mostram que você joga para vencer. A ferramenta que vamos liberar é uma \'Arma Injusta\' contra a concorrência. Você tem frieza para usar isso e lucrar alto?', 
    options: [
      'Sim, quero dominar o meu mercado.', 
      'Não tenho medo de ganhar muito.'
    ] 
  },
];


export function QuizSection({ onComplete, onBack }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string | number) => {
    const newAnswers = { ...answers, [currentQuestion.id]: answer };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col gap-8 animate-fade-in">
      <div className="w-full px-2">
        <p className="text-sm text-center text-slate-400 mb-2">{`Pergunta ${currentQuestionIndex + 1} de ${questions.length}`}</p>
        <Progress value={progress} className="h-2 bg-gray-800 [&>div]:bg-primary transition-all duration-300" />
      </div>

      <ShadCard key={currentQuestionIndex} className="p-6 md:p-8 bg-slate-900/30 backdrop-blur-md border border-primary/20 rounded-2xl shadow-lg">
          <div
            className="w-full text-center animate-fade-in"
          >
            <h2 className="question-text">
              {currentQuestion.text}
            </h2>
            
            <div className="options-list">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className="option-btn"
                >
                  <div className="radio-fake" />
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>
        </ShadCard>

      <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mx-auto">
        <ChevronLeft className="w-4 h-4" />
        Voltar
      </Button>
    </div>
  );
}
