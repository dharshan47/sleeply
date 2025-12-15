export function verifyCronAuth(req: Request) {
  const authHeader = req.headers.get("authorization");
  const urlSecret = new URL(req.url).searchParams.get("secret");
  const secret = process.env.CRON_SECRET;

  if (!secret) throw new Error("CRON_SECRET is not configured");

  return authHeader === `Bearer ${secret}` || urlSecret === secret;
}
