const { getChatResponse } = require('./openAiUtils')
const Roles = require('../constants/roles')
const OpenAiClient = require('../services/openAiClient')
const { getLanguageMessage } = require('../utils/languageSelector')
const faker = require('faker')

jest.mock('../services/openAiClient')
jest.mock('../utils/languageSelector')

describe('getChatResponse', () => {
  beforeEach(() => {
    OpenAiClient.mockClear()
    getLanguageMessage.mockReturnValue({
      chatDefaultMessages: {
        customInstruction: faker.lorem.sentence(),
        noResponseFound: faker.lorem.sentence(),
        errorResponse: faker.lorem.sentence()
      }
    })
  })

  test('[Success] Should return a valid response for a valid input', async () => {
    const fakeResponse = {
      choices: [{ message: { content: faker.lorem.sentence() } }]
    }
    OpenAiClient.prototype.getChatCompletions = jest
      .fn()
      .mockResolvedValue(fakeResponse)

    const testQuestion = faker.lorem.sentence()
    const response = await getChatResponse(testQuestion)

    const expectedCustomInstruction = expect.objectContaining({
      role: Roles.system,
      content: expect.any(String)
    })
    const expectedUserMessage = expect.objectContaining({
      role: Roles.user,
      content: testQuestion
    })

    expect(response.message).toBe(fakeResponse.choices[0].message.content)
    expect(OpenAiClient.prototype.getChatCompletions).toHaveBeenCalledWith(
      expectedCustomInstruction,
      expectedUserMessage
    )
  })

  test('[NoContent] Should handle there is no response', async () => {
    OpenAiClient.prototype.getChatCompletions = jest.fn().mockResolvedValue({})

    const testQuestion = faker.lorem.sentence()
    const response = await getChatResponse(testQuestion)
    expect(response.message).toBe(
      getLanguageMessage().chatDefaultMessages.noResponseFound
    )
  })

  test('[Error] Should handle errors', async () => {
    OpenAiClient.prototype.getChatCompletions = jest
      .fn()
      .mockRejectedValue(new Error(faker.lorem.sentence()))

    const testQuestion = faker.lorem.sentence()
    const response = await getChatResponse(testQuestion)
    expect(response.message).toBe(
      getLanguageMessage().chatDefaultMessages.errorResponse
    )
  })
})
