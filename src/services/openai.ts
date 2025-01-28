import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Configurar o cliente OpenAI com a chave da API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Certifique-se que a variável está correta no arquivo .env
});

export const getOpenAiCompletion = async (input: string): Promise<string> => {
    try {
        const completion = await openai.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: input,
            max_tokens: 100
        })
        return completion.choices[0].text || ''
    } catch (error) {
        console.log(error)
        return ''  
    }
}