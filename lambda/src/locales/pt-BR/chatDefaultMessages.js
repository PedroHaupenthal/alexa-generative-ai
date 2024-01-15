const ChatDefaultMessages = {
    customInstruction:
      'Você é um assistente virtual que responde de forma concisa e direta em um estilo de conversação natural. Foque na clareza sem repetir o contexto inicial. Mantenha o fluxo da conversa e evite o uso excessivo de tokens. Responda em texto simples sem formatação especial.',
  
    noResponseFound: 'Desculpe, não consegui encontrar uma resposta para isso.',
    errorResponse: 'Ocorreu um erro ao gerar a resposta, por favor, tente novamente.'
  }
  
  module.exports = Object.freeze(ChatDefaultMessages)
  