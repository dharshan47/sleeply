import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hashpassword, verifyPassword } from "./scrypt";
import { sendResetPassword, sendVerificationEmail } from "./auth-actions";
import prisma from "./prisma";


export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    password: {
      hash: hashpassword,
      verify: verifyPassword,
    },
    requireEmailVerification: true,
    /* Password Reset Email */
    sendResetPassword: async ({ user, url }) => {
      await sendResetPassword({ user, url });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    /* Verication Email */
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail({ user, url });
    },
  },
  socialProviders: {
    google: {
       prompt: "select_account", 
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
