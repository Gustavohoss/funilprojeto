'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/hero-section';
import { QuizSection } from '@/components/quiz-section';
import { ProcessingSection } from '@/components/processing-section';
import { OfferSection } from '@/components/offer-section';
import { SocialProofSection } from '@/components/social-proof-section';
import { PainPointsSection } from '@/components/pain-points-section';
import ProceduralGroundBackground from '@/components/procedural-ground-background';

type Step = 'hero' | 'quiz' | 'processing' | 'socialProof' | 'painPoints' | 'offer';

// Definindo o tipo para o resultado da análise simulada
export interface SimulatedAnalysisOutput {
  compatibilityScore: number;
  feedback: string;
}

export default function Home() {
  const [step, setStep] = useState<Step>('hero');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, any>>({});
  const [analysisResult, setAnalysisResult] = useState<SimulatedAnalysisOutput | null>(null);

  const handleStartQuiz = () => {
    setStep('quiz');
  };

  const handleGoBack = () => {
    if (step === 'quiz') {
      setStep('hero');
    } else if (step === 'offer') {
      setQuizAnswers({});
      setAnalysisResult(null);
      setStep('quiz');
    } else if (step === 'socialProof') {
      setStep('quiz');
    } else if (step === 'painPoints') {
      setStep('socialProof');
    }
  }

  const handleQuizComplete = (answers: Record<string, any>) => {
    setQuizAnswers(answers);
    setStep('processing');
  };
  
  const handleSocialProofComplete = () => {
    setStep('painPoints');
  }

  const handlePainPointsComplete = () => {
    setStep('offer');
  }

  useEffect(() => {
    if (step === 'processing' && Object.keys(quizAnswers).length > 0) {
      const runAnalysis = async () => {
        // Simula um tempo de processamento mínimo
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        // Simula o resultado da análise de IA
        const simulatedResult: SimulatedAnalysisOutput = {
          compatibilityScore: 92,
          feedback: "Seu perfil tem alta compatibilidade com nosso método. Você está pronto para começar a lucrar com IA."
        };
        
        setAnalysisResult(simulatedResult);
        setStep('socialProof');
      };
      runAnalysis();
    }
  }, [step, quizAnswers]);


  return (
    <>
      <ProceduralGroundBackground isStatic={step !== 'hero'} />
      <main className="flex min-h-svh w-full flex-col items-center p-4 md:p-8 overflow-y-auto">
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center flex-grow py-8">
          {step === 'hero' && <HeroSection onStart={handleStartQuiz} />}
          {step === 'quiz' && <QuizSection onComplete={handleQuizComplete} onBack={handleGoBack} />}
          {step === 'processing' && <ProcessingSection />}
          {step === 'socialProof' && <SocialProofSection onComplete={handleSocialProofComplete} />}
          {step === 'painPoints' && <PainPointsSection onComplete={handlePainPointsComplete} onBack={handleGoBack} />}
          {step === 'offer' && <OfferSection result={analysisResult} onBack={handleGoBack} />}
        </div>
      </main>
    </>
  );
}
