import { transporter } from "../lib/nodemailer";

interface MonthlyMailData {
  email: string;
  name?: string;
  month: string;
  totalSleep: string;
  avgSleep: string;
  bestSleep: number;
  worstSleep: number;
  daysTracked: number;
  noData?: boolean;
}

export async function sendMonthlyMail(data: MonthlyMailData) {
  const year = new Date().getFullYear();

  let html = "";

  if (data.noData) {
    // Template for users with no data
    html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Monthly Sleep Report</title>
        </head>
        <body style="font-family: Arial, Helvetica, sans-serif; background-color:#f6f8fb; padding:20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:30px;">
                  <tr>
                    <td style="text-align:center;">
                      <h2 style="margin:0; color:#1f2937;">Sleep Report for ${
                        data.month
                      }</h2>
                      <p style="color:#6b7280; margin-top:8px;">We noticed you didn’t log any sleep last month.</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:25px; color:#374151; font-size:15px;">
                      <p>Hi ${data.name || "there"},</p>
                      <p>
                        We didn’t find any sleep records for <strong>${
                          data.month
                        }</strong>.
                        Start logging your sleep to get detailed monthly insights!
                      </p>
                      <p style="margin-top:25px;">
                        Best regards,<br />
                        <strong>Sleeply Team</strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:30px; text-align:center; font-size:12px; color:#9ca3af;">
                      You are receiving this email because you use Sleeply.<br />
                      © ${year} Sleeply. All rights reserved.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  } else {
    // Template for users with data
    html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Monthly Sleep Report</title>
        </head>
        <body style="font-family: Arial, Helvetica, sans-serif; background-color:#f6f8fb; padding:20px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:30px;">
                  <tr>
                    <td style="text-align:center;">
                      <h2 style="margin:0; color:#1f2937;">Your Sleep Report for ${
                        data.month
                      }</h2>
                      <p style="color:#6b7280; margin-top:8px;">A summary of your sleep activity</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:25px; color:#374151; font-size:15px;">
                      <p>Hi ${data.name || "there"},</p>
                      <p>We’ve prepared your sleep summary for <strong>${
                        data.month
                      }</strong>. This report highlights your sleep patterns to help you better understand and improve your rest.</p>
                      <table width="100%" cellpadding="10" cellspacing="0" style="margin-top:15px; background:#f9fafb; border-radius:6px;">
                        <tr>
                          <td><strong>Total Sleep</strong></td>
                          <td align="right">${data.totalSleep} hrs</td>
                        </tr>
                        <tr>
                          <td><strong>Average Sleep</strong></td>
                          <td align="right">${data.avgSleep} hrs / day</td>
                        </tr>
                        <tr>
                          <td><strong>Best Sleep Day</strong></td>
                          <td align="right">${data.bestSleep} hrs</td>
                        </tr>
                        <tr>
                          <td><strong>Lowest Sleep Day</strong></td>
                          <td align="right">${data.worstSleep} hrs</td>
                        </tr>
                        <tr>
                          <td><strong>Days Tracked</strong></td>
                          <td align="right">${data.daysTracked}</td>
                        </tr>
                      </table>
                      <p style="margin-top:20px;">
                        Consistent sleep tracking helps identify habits that impact your energy, focus, and overall well-being. Keep logging your sleep to get even more accurate insights.
                      </p>
                      <p style="margin-top:25px;">
                        Best regards,<br />
                        <strong>Sleeply Team</strong>
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:30px; text-align:center; font-size:12px; color:#9ca3af;">
                      You are receiving this email because you use Sleeply.<br />
                      © ${year} Sleeply. All rights reserved.
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  }

  await transporter.sendMail({
    from: `"Sleeply" <${process.env.EMAIL_USER}>`,
    to: data.email,
    subject: `Your ${data.month} Sleep Report`,
    html,
  });
}
