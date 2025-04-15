import { mailtrapClient, sender } from '../config/email.config.js'

import { PASSWORD_RESET_REQUEST_TEMPLATE } from './templates/email.templates.js'

const sendResetPasswordEmail = async (email, resetURL) => {
  const recipient = [{ email }]
  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Reset your password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL),
      category: 'Password Reset',
    })
  } catch (error) {
    throw new Error(`Error sending password reset email: ${error}`)
  }
}

export default sendResetPasswordEmail
