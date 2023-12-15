const twoFactorAuthErrors = {
  invalidOTP: {
    en: 'Invalid one-time password (OTP).',
    fr: 'Mot de passe à usage unique (OTP) invalide.',
  },
  enable2FAFailed: {
    en: 'Failed to enable Two-Factor Authentication.',
    fr: "Échec de l'activation de l'authentification à deux facteurs.",
  },
  disable2FAFailed: {
    en: 'Failed to disable Two-Factor Authentication.',
    fr: "Échec de la désactivation de l'authentification à deux facteurs.",
  },
  log2FARequired: {
    en: 'Two-Factor Authentication is required for this action.',
    fr: "L'authentification à deux facteurs est requise pour cette action.",
  },
}

module.exports = twoFactorAuthErrors
