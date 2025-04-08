import { mailtrapClient, sender } from '../config/email.config.js'

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }]
  try {
    const res = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: 'a307a897-3a15-4f83-855d-d6d184dffe48',
      template_variables: {
        company_info_name: 'Test_Company_info_name',
        name: 'Test_Name',
      },
    })
  } catch (error) {}
}

export default sendWelcomeEmail
