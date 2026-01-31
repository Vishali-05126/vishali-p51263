'use server';

/**
 * @fileOverview Provides a daily injury risk assessment based on historical data, workload, recovery, and biomechanics.
 *
 * @exports assessInjuryRisk - A function that calculates the injury risk.
 * @exports InjuryRiskAssessmentInput - The input type for the assessInjuryRisk function.
 * @exports InjuryRiskAssessmentOutput - The return type for the assessInjuryRisk function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InjuryRiskAssessmentInputSchema = z.object({
  historicalData: z
    .string()
    .describe('Historical training data, including performance, workload, and recovery metrics.'),
  workload: z.string().describe('Current workload information.'),
  recovery: z.string().describe('Recovery metrics such as sleep quality and HRV.'),
  biomechanics: z.string().describe('Biomechanical data from gait/technique analysis.'),
});
export type InjuryRiskAssessmentInput = z.infer<typeof InjuryRiskAssessmentInputSchema>;

const InjuryRiskAssessmentOutputSchema = z.object({
  riskScore: z
    .number()
    .describe('A daily injury risk score (0-100), with explanations of risk contributors.'),
  riskExplanation: z.string().describe('Explanation of the factors contributing to the risk score.'),
  recommendedAction: z
    .string()
    .describe('Recommended actions to mitigate the identified risks.'),
});
export type InjuryRiskAssessmentOutput = z.infer<typeof InjuryRiskAssessmentOutputSchema>;

export async function assessInjuryRisk(input: InjuryRiskAssessmentInput): Promise<InjuryRiskAssessmentOutput> {
  return assessInjuryRiskFlow(input);
}

const injuryRiskAssessmentPrompt = ai.definePrompt({
  name: 'injuryRiskAssessmentPrompt',
  input: {schema: InjuryRiskAssessmentInputSchema},
  output: {schema: InjuryRiskAssessmentOutputSchema},
  prompt: `You are an AI expert in sports injury prevention. Your task is to assess the daily injury risk for an athlete based on their historical data, workload, recovery, and biomechanics.

  Provide a risk score between 0 and 100, where higher scores indicate higher risk. Explain the factors contributing to the risk score and recommend actions to mitigate the identified risks.

  Historical Data: {{{historicalData}}}
  Workload: {{{workload}}}
  Recovery: {{{recovery}}}
  Biomechanics: {{{biomechanics}}}
  \n  Respond with the risk score, explanation and recommended action. Format your answer as JSON according to the output schema.`,
});

const assessInjuryRiskFlow = ai.defineFlow(
  {
    name: 'assessInjuryRiskFlow',
    inputSchema: InjuryRiskAssessmentInputSchema,
    outputSchema: InjuryRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await injuryRiskAssessmentPrompt(input);
    return output!;
  }
);
