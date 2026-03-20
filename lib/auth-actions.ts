import {
  getResetPasswordEmailHtml,
  getVerificationEmailHtml,
} from "@/template/index.js";
import { transporter } from "./nodemailer.js";
import prisma from "./prisma.js";
import { AuthActionData } from "@/types/types.js";

export async function sendResetPassword({ user, url }: AuthActionData) {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!existingUser) {
      throw new Error("Email not found");
    }
    const emailHtml = getResetPasswordEmailHtml(user.name, user.email, url);
    await transporter.sendMail({
      from: '"Sleeply Team" <sleeplyteam@gmail.com>',
      to: user.email,
      subject: "Reset Your Sleeply Password",
      html: emailHtml,
    });
  } catch {
    throw new Error("Failed to send reset password email");
  }
}

export async function sendVerificationEmail({ user, url }: AuthActionData) {
  const emailHtml = getVerificationEmailHtml(user.name, user.email, url);
  await transporter.sendMail({
    from: '"Sleeply Team" <sleeplyteam@gmail.com>',
    to: user.email,
    subject: "Verify Your Sleeply Account",
    html: emailHtml,
  });
}
