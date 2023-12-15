const userErrors = require('./users')
const todoErrors = require('./todos')
const projectErrors = require('./projects')
const twoFactorAuthErrors = require('./2fa')
const generalErrors = require('./general')

class ErrorHandler {
  constructor(language = 'en') {
    this.language = language
  }

  setLanguage(language) {
    this.language = language
  }

  static getErrorMessage(category, errorKey, language = 'en') {
    let errorMessage

    switch (category) {
      case 'users':
        errorMessage = userErrors[errorKey]
        break
      case 'todos':
        errorMessage = todoErrors[errorKey]
        break
      case 'projects':
        errorMessage = projectErrors[errorKey]
        break
      case '2fa':
        errorMessage = twoFactorAuthErrors[errorKey]
        break
      case 'general':
        errorMessage = generalErrors[errorKey]
        break
      default:
        errorMessage = `Unknown error category: ${category}`
    }

    return errorMessage
      ? errorMessage[language]
      : `Unknown error key: ${errorKey}`
  }
}

module.exports = ErrorHandler
