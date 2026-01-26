'use client';

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

type QuizSectionProps = {
  onComplete: (answers: Record<string, any>) => void;
};

const questions = [
  { 
    id: 'concept_understanding', 
    text: 'O sistema é simples: você usará nossa IA para criar sites e cobrar por isso, ficando com <span class="highlight">100% do lucro</span>. O modelo está claro?', 
    options: [
      'Sim, entendi e quero continuar.', 
      'Parecem bom, quero saber mais.'
    ] 
  },
  { 
    id: 'experience_level', 
    text: 'Nossa IA faz 100% do trabalho técnico. Qual seu nível atual de <span class="highlight">experiência</span> com criação de sites?', 
    options: [
      'Sou totalmente iniciante (Nunca criei).', 
      'Tenho uma noção básica.', 
      'Já trabalho na área.'
    ] 
  },
  { 
    id: 'market_awareness', 
    text: '70% das empresas locais não têm site. Você sabia que elas pagam de <span class="highlight">R$ 600 a R$ 1.500</span> por um serviço simples?', 
    options: [
      'Não sabia, estou chocado com o valor.', 
      'Desconfiava, mas não sabia como cobrar.', 
      'Sim, vejo isso todo dia no meu bairro.'
    ] 
  },
  { 
    id: 'work_hours', 
    text: 'Quantas horas por dia você está <span class="highlight">disposto a dedicar</span> para construir sua nova fonte de renda?',
    options: [] // This question uses a custom slider component
  },
  { 
    id: 'mindset_check', 
    text: 'O mercado é cheio de amadores. A ferramenta que vamos liberar é uma <span class="highlight">\'Arma Injusta\'</span>. Você tem frieza para lucrar alto?', 
    options: [
      'Sim, quero dominar o mercado.', 
      'Não tenho medo de ganhar muito.'
    ] 
  },
];

// This is a new sub-component for the special slider question.
function HoursSliderQuestion({ onContinue, questionText }: { onContinue: (hours: number) => void; questionText: string }) {
  const [hours, setHours] = useState(1);

  const dailyGain = hours * 300;
  const monthlyGain = dailyGain * 30;
  const yearlyGain = monthlyGain * 12;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="flex flex-col gap-6 text-center animate-fade-in">
      <p className="question-text !mb-6" dangerouslySetInnerHTML={{ __html: questionText }} />

      <div>
        <p className="mb-4">Horas por dia: <span className="text-primary font-bold">{hours}h</span></p>
        <Slider
          defaultValue={[1]}
          value={[hours]}
          min={1}
          max={8}
          step={1}
          onValueChange={(value) => setHours(value[0])}
          className="w-full max-w-xs mx-auto"
        />
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-400">Potencial de Ganhos</p>
              <p className="text-sm font-bold text-primary">por DIA</p>
              <p className="text-2xl font-bold text-white mt-1">{formatCurrency(dailyGain)}</p>
          </div>
          <div className="bg-slate-900/30 border border-border rounded-xl p-3 text-center">
              <p className="text-xs text-slate-400">Potencial de Ganhos</p>
              <p className="text-sm font-bold text-slate-300">por MÊS</p>
              <p className="text-2xl font-bold text-white mt-1">{formatCurrency(monthlyGain)}</p>
          </div>
        </div>
        <div className="bg-slate-900/30 border border-border rounded-xl p-4 text-center w-full">
            <p className="text-sm text-slate-400">Potencial de Ganhos</p>
            <p className="text-base font-bold text-slate-300">por ANO</p>
            <p className="text-3xl font-bold text-white mt-1">{formatCurrency(yearlyGain)}</p>
        </div>
      </div>

      {yearlyGain >= 108000 && (
          <p className="text-slate-300 text-sm">Em um ano, você poderia <span className="text-white font-bold">comprar um carro novo</span>.</p>
      )}

      <Button
        onClick={() => onContinue(hours)}
        size="lg"
        className="mt-2 w-full text-lg font-bold bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
      >
        Continuar
      </Button>
    </div>
  );
}


export function QuizSection({ onComplete }: QuizSectionProps) {
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
    <div className="w-full max-w-2xl flex flex-col animate-fade-in bg-card/50 border border-primary/10 p-6 md:p-8 rounded-xl shadow-lg">
      <div id="progress-area">
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="step-count">{`Pergunta ${currentQuestionIndex + 1} de ${questions.length}`}</span>
      </div>
      
      <div key={currentQuestionIndex} className="animate-fade-in">
        {currentQuestion.id === 'work_hours' ? (
          <HoursSliderQuestion
            questionText={currentQuestion.text}
            onContinue={handleAnswer}
          />
        ) : (
          <>
            <p className="question-text" dangerouslySetInnerHTML={{ __html: currentQuestion.text }} />
            
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
          </>
        )}
      </div>
    </div>
  );
}
