module.exports = {
    OpenAiClient: {
        baseUrl: process.env.OPEN_AI_BASE_URL,
        authKey: process.env.OPEN_AI_API_KEY,
        chatGpt: {
            completationUrl: '/chat/completions',
            model: 'gpt-3.5-turbo',
            maxTokens: 200,
            temperature: 0.5,
        }
    }
}