const Alexa = require('ask-sdk-core')
const { getLanguageMessage } = require('../utils/languageSelector')
const OpenAiUtils = require('../utils/openAiUtils')

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
    )
  },
  handle(handlerInput) {
    const speakOutput = getLanguageMessage().intentMessages.Launch

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  }
}

const CustomIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'CustomUserInputIntent'
    )
  },
  async handle(handlerInput) {
    const userInput = Alexa.getSlotValue(
      handlerInput.requestEnvelope,
      'userInput'
    )

    const chatGptResponse = await OpenAiUtils.getChatResponse(userInput)

    return handlerInput.responseBuilder
      .speak(chatGptResponse.message)
      .getResponse()
  }
}

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
    )
  },
  handle(handlerInput) {
    const speakOutput = getLanguageMessage().intentMessages.Help

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  }
}

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'AMAZON.CancelIntent' ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'AMAZON.StopIntent')
    )
  },
  handle(handlerInput) {
    const speakOutput = getLanguageMessage().intentMessages.CancelAndStop

    return handlerInput.responseBuilder.speak(speakOutput).getResponse()
  }
}

const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        'AMAZON.FallbackIntent'
    )
  },
  handle(handlerInput) {
    const speakOutput = getLanguageMessage().intentMessages.Fallback

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  }
}

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      'SessionEndedRequest'
    )
  },
  handle(handlerInput) {
    console.log(
      `[SessionEnd]: ${JSON.stringify(handlerInput.requestEnvelope)}`
    )
    return handlerInput.responseBuilder.getResponse()
  }
}

const ErrorHandler = {
  canHandle() {
    return true
  },
  handle(handlerInput, error) {
    const speakOutput = getLanguageMessage().intentMessages.GenericError
    console.log(`[ErrorHandler]: ${JSON.stringify(error)}`)

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  }
}

module.exports = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    CustomIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .withCustomUserAgent('alexa-generative-ai/v1')
  .lambda()
