import { transporter } from "@/lib/nodemailer";
import { getContactEmailHtml, getUserReplyEmailHtml } from "@/template";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: getContactEmailHtml(name, email, message),
    });

    await transporter.sendMail({
      from: `"Sleeply Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `We received your message — Sleeply Support`,
      html: getUserReplyEmailHtml(name),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: "Failed to send email." }),
      { status: 500 },
    );
  }
}
