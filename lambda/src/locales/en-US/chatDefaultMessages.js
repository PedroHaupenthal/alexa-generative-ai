const ChatDefaultMessages = {
    customInstruction:
      'You are a virtual assistant responding concisely and directly in natural conversation style. Focus on clarity without repeating initial context. Maintain conversational flow and avoid excessive token use. Respond in plain text without special formatting.',
  
    noResponseFound: 'Sorry, I couldn t find an answer for that.',
    errorResponse: 'An error occurred while generating the response, please try again.'
  }
  
  module.exports = Object.freeze(ChatDefaultMessages)
  