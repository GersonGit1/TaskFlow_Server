import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import dotenv from 'dotenv'
dotenv.config()

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY!,
});

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    try {
        const sentFrom = new Sender("contacto@gersonamaya.com", "Task Flow");
        const recipients = [new Recipient(user.email)];

        const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject("Task Flow - Confirma tu cuenta")
        .setHtml(`
            <p>Hola: ${user.name}, has creado tu cuenta en Task Flow, ya casi está todo listo, solo debes confirmar tu cuenta.</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
            <p>E ingresa el código: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
        `)
        .setText("Task Flow - Confirma tu cuenta");

        await mailerSend.email.send(emailParams);
    } catch (error) {
        console.error("ERROR al enviar email:", error?.body || error);
    }
  };

  static sendPasswordResetToken = async (user: IEmail) => {
    try {
        const sentFrom = new Sender("contacto@gersonamaya.com", "Task Flow");
        const recipients = [new Recipient(user.email)];

        const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject("Task Flow - Reestablece tu password")
        .setHtml(`
            <p>Hola: ${user.name}, has solicitado reestablecer tu password.</p>
            <p>Visita el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Password</a>
            <p>E ingresa el código: <b>${user.token}</b></p>
            <p>Este token expira en 10 minutos</p>
        `)
        .setText("Task Flow - Reestablece tu password");

        await mailerSend.email.send(emailParams);
    } catch (error) {
        console.error("ERROR al enviar email:", error?.body || error);
    }
  };
}
