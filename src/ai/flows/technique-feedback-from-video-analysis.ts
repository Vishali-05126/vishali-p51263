'use server';

/**
 * @fileOverview Provides technique feedback from video analysis.
 *
 * - analyzeTechnique - A function that handles the video analysis process.
 * - AnalyzeTechniqueInput - The input type for the analyzeTechnique function.
 * - AnalyzeTechniqueOutput - The return type for the analyzeTechnique function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeTechniqueInputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A video of a movement, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  movementDescription: z.string().describe('The name or description of the movement being performed in the video.'),
});
export type AnalyzeTechniqueInput = z.infer<typeof AnalyzeTechniqueInputSchema>;

const AnalyzeTechniqueOutputSchema = z.object({
  biomechanicalFeedback: z.string().describe('Frame-by-frame biomechanical flags and corrections.'),
});
export type AnalyzeTechniqueOutput = z.infer<typeof AnalyzeTechniqueOutputSchema>;

export async function analyzeTechnique(input: AnalyzeTechniqueInput): Promise<AnalyzeTechniqueOutput> {
  return analyzeTechniqueFlow(input);
}

const analyzeTechniquePrompt = ai.definePrompt({
  name: 'analyzeTechniquePrompt',
  input: {schema: AnalyzeTechniqueInputSchema},
  output: {schema: AnalyzeTechniqueOutputSchema},
  prompt: `You are an expert biomechanics analyst. You will analyze the provided video of a movement and provide frame-by-frame feedback on the technique, highlighting any potential issues and suggesting corrections.

  Movement Description: {{{movementDescription}}}
  Video: {{media url=videoDataUri}}`,
});

const analyzeTechniqueFlow = ai.defineFlow(
  {
    name: 'analyzeTechniqueFlow',
    inputSchema: AnalyzeTechniqueInputSchema,
    outputSchema: AnalyzeTechniqueOutputSchema,
  },
  async input => {
    const {output} = await analyzeTechniquePrompt(input);
    return output!;
  }
);
