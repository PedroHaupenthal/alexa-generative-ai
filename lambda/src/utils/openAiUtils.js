const OpenAiClient = require('../services/openAiClient')
const Message = require('../services/models/chatMessage')
const Roles = require('../constants/roles')
const { getLanguageMessage } = require('../utils/languageSelector')

async function getChatResponse(userInput) {
  const customInstruction = new Message(
    Roles.system,
    getLanguageMessage().chatDefaultMessages.customInstruction
  )
  const userMessage = new Message(Roles.user, userInput)

  try {
    const client = new OpenAiClient()
    const response = await client.getChatCompletions(
      customInstruction,
      userMessage
    )

    if (
      !response ||
      !response.choices ||
      response.choices.length === 0 ||
      !response.choices[0].message ||
      !response.choices[0].message.content
    ) {
      console.error('[Utils][getChatResponse] No response', response)

      return {
        message: getLanguageMessage().chatDefaultMessages.noResponseFound
      }
    }

    return { message: response.choices[0].message.content }
  } catch (error) {
    console.error('[Utils][getChatResponse] Error', error)
    return {
      message: getLanguageMessage().chatDefaultMessages.errorResponse
    }
  }
}

module.exports = { getChatResponse }
