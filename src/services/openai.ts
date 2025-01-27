import {OpenAI} from 'openai';
import dotenv from 'dotenv';

dotenv.config()

// const config = new Configuration({
//     apiKey: process.env.OPENIA_API_KEY
// })

const openai = new OpenAI();

export const getOpenAiCompletion = async (input: string): Promise<string> => {
    try {
        const completion = await openai.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: input
        })
        return completion.choices[0].text as string
    } catch (error) {
        console.log(error)
        return ''  
    }
}