import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]
    try{
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email verification"
        })

        console.log("Email sent successfully")
    }catch(err) {
        console.error(`Error sending verification`, err)
        throw new Error(`Error sending verification email: ${err}`)
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "988d87d5-1fb6-4b9d-bffb-3f162e322aa8",
            template_variables: {
              "name": name
            }
        })

        console.log("Email sent successfully", response)
    } catch(err) {
        console.error(`Error sending welcome email`, err)
        throw new Error(`Error sending welcome verification email: ${err}`)
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })
    }catch(err) {
        console.error('Error sending password reset email', error)
    }
}