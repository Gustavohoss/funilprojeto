'use server';

/**
 * @fileOverview Analyzes user quiz responses to determine compatibility with AI profit methods.
 *
 * - analyzeProfileAptitude - A function that analyzes the quiz results and provides a compatibility score.
 * - AnalyzeProfileAptitudeInput - The input type for the analyzeProfileAptitude function.
 * - AnalyzeProfileAptitudeOutput - The return type for the analyzeProfileAptitude function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeProfileAptitudeInputSchema = z.object({
  quizResponses: z
    .record(z.string(), z.any())
    .describe('A record of key-value pairs representing quiz questions and user responses.'),
});
export type AnalyzeProfileAptitudeInput = z.infer<typeof AnalyzeProfileAptitudeInputSchema>;

const AnalyzeProfileAptitudeOutputSchema = z.object({
  compatibilityScore: z
    .number()
    .describe('A numerical score representing the user compatibility with AI profit methods.'),
  feedback: z.string().describe('Personalized feedback based on the compatibility analysis.'),
});
export type AnalyzeProfileAptitudeOutput = z.infer<typeof AnalyzeProfileAptitudeOutputSchema>;

export async function analyzeProfileAptitude(
  input: AnalyzeProfileAptitudeInput
): Promise<AnalyzeProfileAptitudeOutput> {
  return analyzeProfileAptitudeFlow(input);
}

const analyzeProfileAptitudePrompt = ai.definePrompt({
  name: 'analyzeProfileAptitudePrompt',
  input: {schema: AnalyzeProfileAptitudeInputSchema},
  output: {schema: AnalyzeProfileAptitudeOutputSchema},
  prompt: `You are an AI aptitude analyzer. Analyze the quiz responses below to determine the user's compatibility with AI profit methods, providing a compatibility score (0-100) and personalized feedback.\n\nQuiz Responses:\n{{#each quizResponses}}  {{@key}}: {{this}}\n{{/each}}\n\nBased on these responses, determine a compatibility score and write personalized feedback.`,
});

const analyzeProfileAptitudeFlow = ai.defineFlow(
  {
    name: 'analyzeProfileAptitudeFlow',
    inputSchema: AnalyzeProfileAptitudeInputSchema,
    outputSchema: AnalyzeProfileAptitudeOutputSchema,
  },
  async input => {
    const {output} = await analyzeProfileAptitudePrompt(input);
    return output!;
  }
);
