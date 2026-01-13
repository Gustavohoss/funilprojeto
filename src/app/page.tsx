'use client';

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/hero-section';
import { QuizSection } from '@/components/quiz-section';
import { ProcessingSection } from '@/components/processing-section';
import { OfferSection } from '@/components/offer-section';
import { SocialProofSection } from '@/components/social-proof-section';
import { analyzeProfileAptitude, type AnalyzeProfileAptitudeOutput } from '@/ai/flows/analyze-profile-aptitude';
import ProceduralGroundBackground from '@/components/procedural-ground-background';

type Step = 'hero' | 'quiz' | 'processing' | 'socialProof' | 'offer';

export default function Home() {
  const [step, setStep] = useState<Step>('hero');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, any>>({});
  const [analysisResult, setAnalysisResult] = useState<AnalyzeProfileAptitudeOutput | null>(null);

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
    }
  }

  const handleQuizComplete = (answers: Record<string, any>) => {
    setQuizAnswers(answers);
    setStep('processing');
  };
  
  const handleSocialProofComplete = () => {
    setStep('offer');
  }

  useEffect(() => {
    if (step === 'processing' && Object.keys(quizAnswers).length > 0) {
      const runAnalysis = async () => {
        try {
          const analysisPromise = analyzeProfileAptitude({ quizResponses: quizAnswers });
          const minTimePromise = new Promise(resolve => setTimeout(resolve, 4000));

          const [result] = await Promise.all([analysisPromise, minTimePromise]);
          
          setAnalysisResult(result);
          setStep('socialProof');
        } catch (error) {
          console.error("Analysis failed:", error);
          setAnalysisResult({ compatibilityScore: 92, feedback: "Seu perfil tem alta compatibilidade com nosso método. Você está pronto para começar a lucrar com IA." });
          await new Promise(resolve => setTimeout(resolve, 4000));
          setStep('socialProof');
        }
      };
      runAnalysis();
    }
  }, [step, quizAnswers]);


  return (
    <>
      <ProceduralGroundBackground isStatic={step !== 'hero'} />
      <main className="flex min-h-svh w-full flex-col items-center justify-start p-4 md:p-8 overflow-y-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background z-0"></div>
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center flex-grow py-8">
          {step === 'hero' && <HeroSection onStart={handleStartQuiz} />}
          {step === 'quiz' && <QuizSection onComplete={handleQuizComplete} onBack={handleGoBack} />}
          {step === 'processing' && <ProcessingSection />}
          {step === 'socialProof' && <SocialProofSection onComplete={handleSocialProofComplete} />}
          {step === 'offer' && <OfferSection result={analysisResult} onBack={handleGoBack} />}
        </div>
      </main>
    </>
  );
}
