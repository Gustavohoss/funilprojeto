'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Slider } from "@/components/ui/slider";

type QuizSectionProps = {
  onComplete: (answers: Record<string, any>) => void;
  onBack: () => void;
};

const questions = [
  { id: 'daily_internet_access', text: 'Você possui acesso à internet pelo menos 30 min por dia?', options: ['Sim', 'Não'] },
  { id: 'tech_familiarity', text: 'Qual seu nível de familiaridade com tecnologia?', options: ['Iniciante', 'Intermediário', 'Avançado'] },
  { id: 'work_hours', text: 'Quantas horas por dia você pode se dedicar?', type: 'slider', min: 0, max: 15, step: 1 },
  { id: 'income_goal', text: 'Quanto você gostaria de ganhar extra por mês?', options: ['Até R$500', 'De R$500 a R$1.500', 'Acima de R$1.500'] },
  { id: 'learning_willingness', text: 'Você está disposto(a) a aprender novas habilidades para atingir seus objetivos?', options: ['Com certeza!', 'Talvez, dependendo do esforço', 'Não muito'] },
];

function HoursSelector({ question, onAnswer }: { question: any, onAnswer: (value: number) => void }) {
  const [hours, setHours] = useState(1);
  const dailyEarning = hours * 200;
  const monthlyEarning = dailyEarning * 30;

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="w-full text-center">
        <Slider
          defaultValue={[hours]}
          min={question.min}
          max={question.max}
          step={question.step}
          onValueChange={(value) => setHours(value[0])}
          className="my-8"
        />
        <p className="text-xl text-slate-300">Horas por dia: <span className="font-bold text-white">{hours}h</span></p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 w-full justify-around">
        <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-slate-300">Potencial de Ganhos</p>
          <p className="text-2xl font-bold text-primary">por DIA</p>
          <p className="text-4xl font-bold text-white">R$ {dailyEarning.toLocaleString('pt-BR')}</p>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-lg">
          <p className="text-slate-300">Potencial de Ganhos</p>
          <p className="text-2xl font-bold text-slate-300">por MÊS</p>
          <p className="text-4xl font-bold text-white">R$ {monthlyEarning.toLocaleString('pt-BR')}</p>
        </div>
      </div>
      
      <Button
        onClick={() => onAnswer(hours)}
        size="lg"
        className="w-full mt-4 text-lg font-bold bg-primary text-primary-foreground rounded-full px-12 py-8 hover:bg-primary/90 transition-all duration-300"
      >
        Continuar
      </Button>
    </div>
  );
}


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

      <Card 
        key={currentQuestionIndex}
        className="glassmorphism w-full text-center animate-fade-in"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 font-headline">
          {currentQuestion.text}
        </h2>
        
        {currentQuestion.type === 'slider' ? (
          <HoursSelector question={currentQuestion} onAnswer={handleAnswer} />
        ) : (
          <div className="flex flex-col gap-4">
            {currentQuestion.options?.map((option) => (
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
        )}
      </Card>

      <Button variant="ghost" onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white mx-auto">
        <ChevronLeft className="w-4 h-4" />
        Voltar
      </Button>
    </div>
  );
}
