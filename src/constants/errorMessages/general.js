// general.js
const generalErrors = {
  internalServerError: {
    en: 'Internal server error. Please try again later.',
    fr: 'Erreur interne du serveur. Veuillez réessayer ultérieurement.',
  },
  unauthorizedAccess: {
    en: 'Unauthorized access. Please log in to continue.',
    fr: 'Accès non autorisé. Veuillez vous connecter pour continuer.',
  },
  databaseConnectionError: {
    en: 'Unable to establish a connection to the database.',
    fr: "Impossible d'établir une connexion à la base de données.",
  },
  databaseConnectionSuccesfully: {
    en: 'Successfully connected to the database.',
    fr: 'Connexion réussie à la base de données.',
  },
  helloWorld: {
    en: 'Hello World!',
    fr: 'Bonjour le monde!',
  },
  PermissionsError: {
    en: 'You do not have permission to access this resource.',
    fr: "Vous n'avez pas la permission d'accéder à cette ressource.",
  },
}

module.exports = generalErrors
