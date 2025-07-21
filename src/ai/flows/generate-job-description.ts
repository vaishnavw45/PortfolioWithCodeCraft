'use server';

/**
 * @fileOverview A flow that generates a more detailed and engaging job description from a brief description.
 *
 * - generateJobDescription - A function that generates a detailed job description.
 * - GenerateJobDescriptionInput - The input type for the generateJobDescription function.
 * - GenerateJobDescriptionOutput - The return type for the generateJobDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJobDescriptionInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('A brief description of the job responsibilities.'),
});
export type GenerateJobDescriptionInput = z.infer<typeof GenerateJobDescriptionInputSchema>;

const GenerateJobDescriptionOutputSchema = z.object({
  detailedDescription: z
    .string()
    .describe('A detailed and engaging job description with bullet points.'),
});
export type GenerateJobDescriptionOutput = z.infer<typeof GenerateJobDescriptionOutputSchema>;

export async function generateJobDescription(
  input: GenerateJobDescriptionInput
): Promise<GenerateJobDescriptionOutput> {
  return generateJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateJobDescriptionPrompt',
  input: {schema: GenerateJobDescriptionInputSchema},
  output: {schema: GenerateJobDescriptionOutputSchema},
  prompt: `You are a career expert. You are helping a user flesh out their job description for their portfolio.

  The user will provide a brief description of their job responsibilities. You should generate a more detailed and engaging job description with bullet points for their portfolio.
  The job description should have an exciting tone and should include a bullet point list of responsibilities, accomplishments, and metrics.

  Here is the job description: {{{jobDescription}}}
  `,
});

const generateJobDescriptionFlow = ai.defineFlow(
  {
    name: 'generateJobDescriptionFlow',
    inputSchema: GenerateJobDescriptionInputSchema,
    outputSchema: GenerateJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
