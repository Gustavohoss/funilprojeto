'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card as ShadCard } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Slider } from "@/components/ui/slider";

type QuizSectionProps = {
  onComplete: (answers: Record<string, any>) => void;
  onBack: () => void;
  onHoursChange?: (hours: number) => void;
};

const questions = [
  { 
    id: 'experience_level', 
    text: 'Nossa IA faz 90% do trabalho técnico (códigos e design). Qual é o seu nível atual de experiência com criação de sites?', 
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
  { id: 'work_hours', text: 'Quantas horas por dia você está disposto a dedicar para construir sua nova fonte de renda?', type: 'slider', min: 0, max: 15, step: 1 },
  { id: 'method_willingness', text: 'Você está pronto para seguir um método comprovado, mesmo que isso signifique desafiar tudo o que aprendeu sobre "trabalho duro" até hoje?', options: ['Sim, estou faminto por uma mudança.', 'Tenho receio, mas estou curioso.', 'Prefiro o caminho tradicional.'] },
];

function HoursSelector({ question, onAnswer, onHoursChange }: { question: any, onAnswer: (value: number) => void, onHoursChange?: (hours: number) => void }) {
  const [hours, setHours] = useState(1);
  const dailyEarning = hours * 200;
  const monthlyEarning = dailyEarning * 30;
  const annualEarning = monthlyEarning * 12;

  useEffect(() => {
    if (onHoursChange) {
      onHoursChange(hours);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hours]);

  const getAnnualGoal = (earning: number) => {
    if (earning > 1000000) return "alcançar a independência financeira";
    if (earning > 500000) return "comprar um carro de luxo";
    if (earning > 200000) return "comprar um imóvel";
    if (earning > 80000) return "comprar um carro novo";
    if (earning > 30000) return "fazer a viagem dos sonhos";
    if (earning > 10000) return "trocar de celular por um top de linha";
    if (hours === 0) return "selecione o tempo disponível";
    return "ter uma ótima renda extra";
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-full text-center">
        <Slider
          defaultValue={[hours]}
          min={question.min}
          max={question.max}
          step={question.step}
          onValueChange={(value) => setHours(value[0])}
          className="my-8"
        />
        <p className="text-lg text-slate-300">Horas por dia: <span className="font-bold text-white">{hours}h</span></p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 w-full justify-around">
        <div className="text-center p-2 md:p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-xs md:text-sm text-slate-300">Potencial de Ganhos</p>
          <p className="text-base md:text-xl font-bold text-primary">por DIA</p>
          <p className="text-xl md:text-3xl font-bold text-white">R$ {dailyEarning.toLocaleString('pt-BR')}</p>
        </div>
        <div className="text-center p-2 md:p-4 bg-white/5 rounded-lg">
          <p className="text-xs md:text-sm text-slate-300">Potencial de Ganhos</p>
          <p className="text-base md:text-xl font-bold text-slate-300">por MÊS</p>
          <p className="text-xl md:text-3xl font-bold text-white">R$ {monthlyEarning.toLocaleString('pt-BR')}</p>
        </div>
        <div className="col-span-2 md:col-span-1 text-center p-2 md:p-4 bg-white/5 rounded-lg">
          <p className="text-xs md:text-sm text-slate-300">Potencial de Ganhos</p>
          <p className="text-base md:text-xl font-bold text-slate-300">por ANO</p>
          <p className="text-xl md:text-3xl font-bold text-white">R$ {annualEarning.toLocaleString('pt-BR')}</p>
        </div>
      </div>

      <p className="text-center text-slate-400 mt-2 text-sm md:text-base h-5">
        { hours > 0 ? (
          <>Em um ano, você poderia <span className="font-bold text-slate-200">{getAnnualGoal(annualEarning)}</span>.</>
        ) : (
          <span className="text-amber-500 font-bold">Selecione um tempo para continuar</span>
        )}
      </p>
      
      <Button
        onClick={() => onAnswer(hours)}
        size="lg"
        disabled={hours === 0}
        className="w-full mt-4 text-lg font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        Continuar
      </Button>
    </div>
  );
}


export function QuizSection({ onComplete, onBack, onHoursChange }: QuizSectionProps) {
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
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 font-headline">
              {currentQuestion.text}
            </h2>
            
            {currentQuestion.type === 'slider' ? (
              <HoursSelector question={currentQuestion} onAnswer={handleAnswer} onHoursChange={onHoursChange} />
            ) : (
              <div className="flex flex-col gap-4">
                {currentQuestion.options?.map((option) => (
                  <Button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    variant="outline"
                    size="lg"
                    className="w-full text-lg py-8 border-primary/30 bg-transparent hover:bg-primary/20 hover:text-white transition-all duration-200"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </ShadCard>

      <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mx-auto">
        <ChevronLeft className="w-4 h-4" />
        Voltar
      </Button>
    </div>
  );
}
