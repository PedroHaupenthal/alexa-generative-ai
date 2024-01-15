const { getLanguageMessage } = require('./languageSelector')

jest.mock('../configs/language', () => ({
  Language: {
    code: 'en-US'
  }
}))

jest.mock(
  '../locales/en-US/intentMessages',
  () => ({
    WelcomeMessage: 'Welcome'
  }),
  { virtual: true }
)

jest.mock(
  '../locales/en-US/chatDefaultMessages',
  () => ({
    CustomInstruction: 'Instruction'
  }),
  { virtual: true }
)

describe('getLanguageMessage', () => {
  test('Should correctly import and return language specific messages', () => {
    const messages = getLanguageMessage()

    expect(messages.intentMessages.WelcomeMessage).toEqual('Welcome')
    expect(messages.chatDefaultMessages.CustomInstruction).toEqual(
      'Instruction'
    )
  })
})
