import axios from 'axios';

const API_KEY = "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";
const API_URL = 'https://api.openai.com/v1/engines/davinci/completions';

export async function sendMessageToChatGPT(message: string) {
  try {
    const response = await axios.post(
      API_URL,
      {
        prompt: message,
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );
    const chatResponse = response.data.choices[0].text.trim();
    return chatResponse;
  } catch (error) {
    console.error(error);
    return "Sorry, I'm having trouble processing your request right now. Please try again later.";
  }
}
