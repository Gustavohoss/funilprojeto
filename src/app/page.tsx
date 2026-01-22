'use client';

import { useState, useEffect, useCallback } from 'react';
import { HeroSection } from '@/components/hero-section';
import { QuizSection } from '@/components/quiz-section';
import { ProcessingSection } from '@/components/processing-section';
import { OfferSection } from '@/components/offer-section';
import { SocialProofSection } from '@/components/social-proof-section';
import { AnalysisResultSection } from '@/components/analysis-result-section';
import { MethodologySection } from '@/components/methodology-section';
import ProceduralGroundBackground from '@/components/procedural-ground-background';

type Step = 'hero' | 'quiz' | 'processing' | 'analysis' | 'socialProof' | 'methodology' | 'offer';

export interface SimulatedAnalysisOutput {
  compatibilityScore: number;
  feedback: string;
}

const ORIGINAL_TITLE = 'AI Profit Decoder';

export default function Home() {
  const [step, setStep] = useState<Step>('hero');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, any>>({});
  const [analysisResult, setAnalysisResult] = useState<SimulatedAnalysisOutput | null>(null);

  const updateTitleWithEarnings = useCallback((hours: number | null) => {
    if (typeof window !== 'undefined') {
      if (hours === null || hours === 0) {
        document.title = ORIGINAL_TITLE;
      } else {
        const monthlyEarning = hours * 200 * 30;
        document.title = `Potencial de R$ ${monthlyEarning.toLocaleString('pt-BR')}/mês | ${ORIGINAL_TITLE}`;
      }
    }
  }, []);

  const handleStartQuiz = () => setStep('quiz');
  const handleGoBackToHero = () => {
    updateTitleWithEarnings(null);
    setStep('hero');
  };
  const handleGoBackToQuiz = () => {
    updateTitleWithEarnings(null);
    setQuizAnswers({});
    setAnalysisResult(null);
    setStep('quiz');
  };

  const handleQuizComplete = (answers: Record<string, any>) => {
    setQuizAnswers(answers);
    setStep('processing');
  };

  const handleAnalysisComplete = () => setStep('socialProof');
  const handleSocialProofComplete = () => setStep('methodology');
  const handleMethodologyComplete = () => setStep('offer');

  useEffect(() => {
    if (step === 'processing' && Object.keys(quizAnswers).length > 0) {
      updateTitleWithEarnings(null);
      
      const runAnalysis = async () => {
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        const simulatedResult: SimulatedAnalysisOutput = {
          compatibilityScore: 92,
          feedback: "Seu perfil tem alta compatibilidade com nosso método. Você está pronto para começar a lucrar com IA."
        };
        
        setAnalysisResult(simulatedResult);
        setStep('analysis');
      };
      runAnalysis();
    }
  }, [step, quizAnswers, updateTitleWithEarnings]);


  return (
    <>
      <ProceduralGroundBackground isStatic={step !== 'hero'} />
      <main className="flex min-h-svh w-full flex-col items-center p-4 md:p-8 overflow-y-auto">
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center flex-grow py-8">
          {step === 'hero' && <HeroSection onStart={handleStartQuiz} />}
          {step === 'quiz' && <QuizSection onComplete={handleQuizComplete} onBack={handleGoBackToHero} onHoursChange={updateTitleWithEarnings} />}
          {step === 'processing' && <ProcessingSection />}
          {step === 'analysis' && <AnalysisResultSection result={analysisResult} onComplete={handleAnalysisComplete} />}
          {step === 'socialProof' && <SocialProofSection onComplete={handleSocialProofComplete} />}
          {step === 'methodology' && <MethodologySection onComplete={handleMethodologyComplete} />}
          {step === 'offer' && <OfferSection result={analysisResult} onBack={handleGoBackToQuiz} />}
        </div>
      </main>
    </>
  );
}
