const nodemailer = require('nodemailer')

const emailService = {
  sendActivationEmail: async (to, username, activationToken) => {
    try {
      const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 8025,
        secure: false,
      })

      const activationLink = `http://localhost:${process.env.API_PORT}/users/activation/${activationToken}`
      const nameOfTheApp = 'todo'

      const mailOptions = {
        from: 'noreply@todo.com',
        to: to,
        subject: `Activation de compte - ${nameOfTheApp}`,
        html: `
		<p style="font-family: 'Arial', sans-serif;">Bonjour ${username}!</p>
		<p style="font-family: 'Arial', sans-serif;">Nous sommes ravis de vous accueillir chez ${nameOfTheApp} !</p>
		<p style="font-family: 'Arial', sans-serif;">Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
		<a target="_blank" href="${activationLink}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #ffffff; text-decoration: none; font-family: 'Arial', sans-serif; border-radius: 5px;">Activer mon compte</a>
		<p style="font-family: 'Arial', sans-serif;">Merci de faire partie de notre communauté.</p>
		<p style="font-family: 'Arial', sans-serif;">Cordialement,<br/>L'équipe ${nameOfTheApp}</p>
	  `,
      }

      const info = await transporter.sendMail(mailOptions)

      return true
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'e-mail d'activation :", error)
      throw new Error("Erreur lors de l'envoi de l'e-mail d'activation")
    }
  },
}

module.exports = emailService
