const OpenAiClient = require('./openAiClient')
const axios = require('axios')
const faker = require('faker')
const Roles = require('../constants/roles')
const { OpenAiClient: config } = require('../configs/client')

jest.mock('axios')

describe('OpenAiClient', () => {
  describe('getChatCompletions', () => {
    let openAiClient
    let fakeCustomInstruction, fakeMessage

    beforeEach(() => {
      axios.create.mockReturnThis()
      axios.post = jest.fn()

      openAiClient = new OpenAiClient()
      fakeCustomInstruction = {
        role: Roles.system,
        content: faker.lorem.sentence()
      }
      fakeMessage = { role: Roles.user, content: faker.lorem.sentence() }
    })

    test('[Success] Should correctly handle a valid response', async () => {
      const fakeResponseData = {
        choices: [{ message: { content: faker.lorem.sentence() } }]
      }
      axios.post.mockResolvedValue({ data: fakeResponseData })

      const response = await openAiClient.getChatCompletions(
        fakeCustomInstruction,
        fakeMessage
      )

      expect(response).toEqual(fakeResponseData)
      expect(axios.post).toHaveBeenCalledWith(
        config.chatGpt.completionUrl,
        expect.objectContaining({
          model: config.chatGpt.model,
          messages: [fakeCustomInstruction, fakeMessage],
          max_tokens: config.chatGpt.maxTokens,
          temperature: config.chatGpt.temperature
        })
      )
    })

    test('[Error] Should handle errors correctly', async () => {
      const errorMessage = 'Network error'
      axios.create.mockReturnThis()
      axios.post.mockRejectedValue(new Error(errorMessage))

      await expect(
        openAiClient.getChatCompletions(fakeCustomInstruction, fakeMessage)
      ).rejects.toThrow(Error)
    })
  })
})
