export function getContactEmailHtml(
  name: string,
  email: string,
  message: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Message</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; padding: 40px 0;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
              
              <!-- Header -->
              <tr>
                <td style="padding: 40px 40px 20px 40px; text-align: center;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #18181b;">📩 New Contact Message</h1>
                </td>
              </tr>
              
              <!-- Content -->
              <tr>
                <td style="padding: 0 40px 30px 40px;">
                  <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px; color: #52525b;">
                    You received a new message from <strong>${name}</strong>:
                  </p>

                  <table cellpadding="0" cellspacing="0" width="100%" style="margin: 20px 0; border-collapse: collapse;">
                    <tr>
                      <td style="font-size: 15px; color: #71717a; padding: 8px 0; width: 100px;">Name:</td>
                      <td style="font-size: 15px; color: #18181b; padding: 8px 0;">${name}</td>
                    </tr>
                    <tr>
                      <td style="font-size: 15px; color: #71717a; padding: 8px 0;">Email:</td>
                      <td style="font-size: 15px; color: #3b82f6; padding: 8px 0;">${email}</td>
                    </tr>
                    <tr>
                      <td style="font-size: 15px; color: #71717a; padding: 8px 0; vertical-align: top;">Message:</td>
                      <td style="font-size: 15px; color: #18181b; padding: 8px 0; line-height: 22px;">${message}</td>
                    </tr>
                  </table>

                  <p style="margin: 30px 0 10px 0; font-size: 14px; line-height: 20px; color: #a1a1aa;">
                    This message was sent from the Sleeply contact form.
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px 40px 40px 40px; border-top: 1px solid #e4e4e7;">
                  <p style="margin: 0; font-size: 12px; line-height: 18px; color: #a1a1aa; text-align: center;">
                    &copy; ${new Date().getFullYear()} Sleeply. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `.trim();
}
