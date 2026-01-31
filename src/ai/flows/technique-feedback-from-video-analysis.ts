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

const FeedbackItemSchema = z.object({
    issue: z.string().describe("A specific issue identified in the user's technique."),
    correction: z.string().describe("A specific, actionable correction for the identified issue."),
    timestamp: z.string().describe("The timestamp in the video (e.g., '0:03') where the issue occurs.").optional(),
});

const AnalyzeTechniqueOutputSchema = z.object({
    overallSummary: z.string().describe("A brief, encouraging summary of the overall performance."),
    feedback: z.array(FeedbackItemSchema).describe('A list of specific biomechanical feedback points.'),
});
export type AnalyzeTechniqueOutput = z.infer<typeof AnalyzeTechniqueOutputSchema>;


export async function analyzeTechnique(input: AnalyzeTechniqueInput): Promise<AnalyzeTechniqueOutput> {
  return analyzeTechniqueFlow(input);
}

const analyzeTechniquePrompt = ai.definePrompt({
  name: 'analyzeTechniquePrompt',
  input: {schema: AnalyzeTechniqueInputSchema},
  output: {schema: AnalyzeTechniqueOutputSchema},
  prompt: `You are an expert biomechanics analyst and a friendly AI coach for young athletes. Analyze the provided video of a movement.

First, provide a brief, encouraging 'overallSummary' of the performance.

Then, identify specific technical issues. For each issue, provide a 'feedback' array with:
- 'issue': A clear and simple description of the problem (e.g., "Knees caving inward").
- 'correction': An easy-to-understand, actionable tip to fix it (e.g., "Try to push your knees out, like you're spreading the floor apart.").
- 'timestamp': If possible, identify the timestamp in the video where the issue is most visible.

Keep your language positive and easy for a young athlete to understand.

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
