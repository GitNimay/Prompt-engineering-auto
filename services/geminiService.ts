
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getMetaPrompt = (userPrompt: string): string => `
You are an expert prompt engineer specializing in generating prompts for AI code generation models. Your task is to take a user's simple request and transform it into a highly-detailed, structured, and effective prompt.

The user's request is: "${userPrompt}"

Your goal is to generate a new prompt that will guide an AI to produce high-quality, accurate, and complete code. The enhanced prompt MUST be formatted in Markdown and include the following sections:

**1. Role and Goal:**
- Define the persona the AI should adopt (e.g., "You are a senior frontend developer specializing in React and TypeScript.").
- Clearly state the primary objective of the task.

**2. Context and Requirements:**
- Provide necessary background information.
- List specific technical requirements (e.g., "Use React 18+ with functional components and hooks," "Style with Tailwind CSS only," "Ensure the code is well-commented.").
- Mention any libraries or frameworks to be used or avoided.

**3. Step-by-Step Implementation Guide:**
- Break down the task into a numbered list of small, actionable steps. This is the most critical part. Be very specific. For example, instead of "Create a component," say "1. Create a functional component named 'UserProfile'. 2. Define its props interface 'UserProfileProps' with 'name' (string) and 'avatarUrl' (string). 3. Render an 'img' tag for the avatar and an 'h2' tag for the name."

**4. Constraints and Edge Cases:**
- Specify what the AI should *not* do (e.g., "Do not use inline styles," "Do not use class components.").
- Mention any edge cases to consider (e.g., "Handle the case where the avatarUrl is missing," "What should happen if the input array is empty?").

**5. Desired Output Format:**
- Clearly describe the final output. For example: "Provide a single, complete, and functional React component in a single TSX file. The code should be wrapped in a single Markdown code block."

Do not generate the code itself. Your only output should be the enhanced Markdown prompt. Do not add any conversational filler before or after the prompt.
`;

export const enhancePrompt = async (userPrompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: getMetaPrompt(userPrompt),
        });
        
        return response.text.trim();
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("An error occurred while communicating with the Gemini API.");
    }
};
