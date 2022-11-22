import nodemailer from 'nodemailer'
import "dotenv/config"

export const verifyEmail = async (mailOpt) => {

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  return transporter.sendMail(mailOpt)
}
