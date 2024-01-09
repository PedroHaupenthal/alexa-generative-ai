const { Language } = require('../configs/language')

function getLanguageMessage() {
  return {
    intentMessages: require(`../locales/${Language.code}/intentMessages`),
    chatDefaultMessages: require(`../locales/${Language.code}/chatDefaultMessages`)
  }
}

module.exports = { getLanguageMessage }
