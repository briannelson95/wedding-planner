import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }
})

export async function sendInviteEmail({
    to,
    inviterName,
    inviteUrl,
    role,
}: {
    to: string
    inviterName: string
    inviteUrl: string
    role: string
}) {
    const fromName = process.env.SMTP_FROM_NAME || 'Wedding Planner'
    const fromEmail = process.env.SMTP_FROM_EMAIL || 'noreply@example.com'

    await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to,
        subject: `${inviterName} invited you to join their wedding planner`,
        html: `
            <p>Hello!</p>
            <p><strong>${inviterName}</strong> invited you to join their wedding planning space as a <strong>${role}</strong>.</p>
            <p><a href="${inviteUrl}">Click here to accept your invite</a></p>
            <p>This link will expire in 72 hours.</p>
        `,
    })
}