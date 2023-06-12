import axios from 'axios';
const { Configuration, OpenAIApi } = require("openai");


async function getChatbotResponse(message) {
  //const prompt = `User: ${message}\nChatbot:`;
  const configuration = new Configuration({
    apiKey: 'PASTE_YOUR_API_KEY_HERE',
  });
  const openai = new OpenAIApi(configuration);
  const data = {
    model:"text-davinci-003",
    prompt: message,
    n: 1,
    max_tokens: 3300,
    temperature: 0.5,
  };
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${configuration.apiKey}`,
  };

//   const response = completions.choices[0].text.trim();
const response = await axios.post('https://api.openai.com/v1/completions', data, { headers });
  return response;
}
export default getChatbotResponse;
