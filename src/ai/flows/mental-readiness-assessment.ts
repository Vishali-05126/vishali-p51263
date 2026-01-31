'use server';

/**
 * @fileOverview Provides a mental readiness assessment for athletes.
 *
 * @exports assessMentalReadiness - A function that calculates mental readiness.
 * @exports MentalReadinessInput - The input type for the assessMentalReadiness function.
 * @exports MentalReadinessOutput - The return type for the assessMentalReadiness function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MentalReadinessInputSchema = z.object({
  stressLevel: z.number().describe('Current stress level (1-10).'),
  focusLevel: z.number().describe('Current focus level (1-10).'),
  confidenceLevel: z.number().describe('Current confidence level (1-10).'),
  motivationLevel: z.number().describe('Current motivation level (1-10).'),
});
export type MentalReadinessInput = z.infer<typeof MentalReadinessInputSchema>;

const MentalReadinessOutputSchema = z.object({
  readinessScore: z.number().describe('An overall mental readiness score (0-100).'),
  feedback: z.string().describe('Personalized feedback based on the input.'),
  recommendation: z.string().describe('A simple, actionable recommendation or mindfulness exercise.'),
});
export type MentalReadinessOutput = z.infer<typeof MentalReadinessOutputSchema>;

export async function assessMentalReadiness(input: MentalReadinessInput): Promise<MentalReadinessOutput> {
  return assessMentalReadinessFlow(input);
}

const mentalReadinessPrompt = ai.definePrompt({
  name: 'mentalReadinessPrompt',
  input: {schema: MentalReadinessInputSchema},
  output: {schema: MentalReadinessOutputSchema},
  prompt: `You are an AI sports psychologist for young athletes. Your task is to assess the mental readiness of an athlete based on their self-reported scores.

  Analyze the following scores (out of 10):
  - Stress Level: {{{stressLevel}}}
  - Focus Level: {{{focusLevel}}}
  - Confidence Level: {{{confidenceLevel}}}
  - Motivation Level: {{{motivationLevel}}}

  Based on these scores, calculate an overall 'readinessScore' from 0-100.
  Provide encouraging and constructive 'feedback'.
  Suggest a simple, actionable 'recommendation', like a quick breathing exercise or a visualization technique.
  Keep the tone positive and supportive. Format your answer as JSON according to the output schema.`,
});

const assessMentalReadinessFlow = ai.defineFlow(
  {
    name: 'assessMentalReadinessFlow',
    inputSchema: MentalReadinessInputSchema,
    outputSchema: MentalReadinessOutputSchema,
  },
  async input => {
    const {output} = await mentalReadinessPrompt(input);
    return output!;
  }
);
