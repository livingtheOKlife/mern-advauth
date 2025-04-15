import { mailtrapClient, sender } from '../config/email.config.js'

import { PASSWORD_RESET_SUCCESS_TEMPLATE } from './templates/email.templates.js'

const sendResetSuccessfulEmail = async (email) => {
  const recipient = [{ email }]
  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: 'Password reset successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset',
    })
  } catch (error) {
    throw new Error(`Error sending reset password email: ${error}`)
  }
}

export default sendResetSuccessfulEmail
