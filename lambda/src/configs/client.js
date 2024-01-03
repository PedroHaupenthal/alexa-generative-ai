module.exports = {
    OpenAiClient: {
        baseUrl: process.env.OPEN_AI_BASE_URL,
        authKey: process.env.OPEN_AI_API_KEY,
        chatGpt: {
            completionUrl: '/chat/completions',
            model: 'gpt-3.5-turbo',
            maxTokens: 300,
            temperature: 0.5,
        }
    }
}