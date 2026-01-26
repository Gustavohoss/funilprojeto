'use client';

import { useState } from "react";

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
    text: 'Quantas horas por dia você pode dedicar para construir sua <span class="highlight">nova fonte de renda</span>?',
    options: [
      'Menos de 1h por dia (Renda Extra).',
      '1h a 3h por dia (Transição de carreira).',
      'Tempo integral (Quero viver disso).'
    ]
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
      </div>
    </div>
  );
}
