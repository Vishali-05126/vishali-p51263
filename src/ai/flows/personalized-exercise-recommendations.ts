'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized exercise recommendations based on various user data.
 *
 * The flow takes into account injury risk, recent performance, pain feedback, sleep data, and HRV to suggest appropriate exercises.
 *
 * @interface PersonalizedExerciseRecommendationsInput - The input type for the personalized exercise recommendation flow.
 * @interface PersonalizedExerciseRecommendationsOutput - The output type for the personalized exercise recommendation flow.
 * @function personalizedExerciseRecommendations - The main function that triggers the flow and returns the recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedExerciseRecommendationsInputSchema = z.object({
  injuryRiskScore: z.number().describe('A score indicating the user\'s current risk of injury (0-100).'),
  recentPerformance: z.string().describe('Description of the user\'s recent athletic performance.'),
  painFeedback: z.string().describe('User feedback on any pain or soreness experienced.'),
  sleepData: z.string().describe('Data related to the user\'s sleep patterns and quality.'),
  hrvData: z.string().describe('Data related to the user\'s heart rate variability.'),
});
export type PersonalizedExerciseRecommendationsInput = z.infer<typeof PersonalizedExerciseRecommendationsInputSchema>;

const PersonalizedExerciseRecommendationsOutputSchema = z.object({
  exerciseRecommendations: z.string().describe('A list of personalized exercise recommendations based on the input data.'),
});
export type PersonalizedExerciseRecommendationsOutput = z.infer<typeof PersonalizedExerciseRecommendationsOutputSchema>;

export async function personalizedExerciseRecommendations(
  input: PersonalizedExerciseRecommendationsInput
): Promise<PersonalizedExerciseRecommendationsOutput> {
  return personalizedExerciseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedExerciseRecommendationsPrompt',
  input: {schema: PersonalizedExerciseRecommendationsInputSchema},
  output: {schema: PersonalizedExerciseRecommendationsOutputSchema},
  prompt: `Based on the following information, provide personalized exercise recommendations:

Injury Risk Score: {{{injuryRiskScore}}}
Recent Performance: {{{recentPerformance}}}
Pain Feedback: {{{painFeedback}}}
Sleep Data: {{{sleepData}}}
HRV Data: {{{hrvData}}}

Please provide specific exercises and routines that address the user\'s needs and help optimize their training while minimizing injury risk.`,
});

const personalizedExerciseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedExerciseRecommendationsFlow',
    inputSchema: PersonalizedExerciseRecommendationsInputSchema,
    outputSchema: PersonalizedExerciseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
