const axios = require('axios')
const { OpenAiClient: config } = require('../configs/client')

class OpenAiClient {
  constructor() {
    this.client = axios.create({
      baseURL: config.baseUrl,
      headers: {
        Authorization: 'Bearer ' + config.authKey
      },
      timeout: config.timeoutLimit
    })
  }

  async getChatCompletions(customInstruction, message) {
    try {
      const body = {
        model: config.chatGpt.model,
        messages: [customInstruction, message],
        max_tokens: config.chatGpt.maxTokens,
        temperature: config.chatGpt.temperature
      }

      const response = await this.client.post(
        config.chatGpt.completionUrl,
        body
      )

      return response.data
    } catch (error) {
      console.error('OpenAiClient | getChatCompletions Error:', error)
      throw new Error(error)
    }
  }
}

module.exports = OpenAiClient
