const nodemailer = require('nodemailer')

const emailService = {
  sendActivationEmail: async (to, activationToken) => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 8025,
        secure: false,
      })

      const activationLink = `http://localhost:3000/activate?token=${activationToken}`

      const mailOptions = {
        from: 'noreply@todoback.com',
        to: to,
        subject: 'Activation de compte - TODO BACK',
        html: `
		<p style="font-family: 'Arial', sans-serif;">Bonjour,</p>
		<p style="font-family: 'Arial', sans-serif;">Nous sommes ravis de vous accueillir chez TODO BACK !</p>
		<p style="font-family: 'Arial', sans-serif;">Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
		<a target="_blank" href="${activationLink}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #ffffff; text-decoration: none; font-family: 'Arial', sans-serif; border-radius: 5px;">Activer mon compte</a>
		<p style="font-family: 'Arial', sans-serif;">Merci de faire partie de notre communauté.</p>
		<p style="font-family: 'Arial', sans-serif;">Cordialement,<br/>L'équipe TODO BACK</p>
	  `,
      }

      const info = await transporter.sendMail(mailOptions)

      console.log("E-mail d'activation envoyé :", info.response)
      return true
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail d'activation :", error)
      throw new Error("Erreur lors de l'envoi de l'e-mail d'activation")
    }
  },

  // Ajoutez d'autres fonctions pour la gestion des e-mails selon vos besoins
}

module.exports = emailService
