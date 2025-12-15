export function verifyCronAuth(req: Request) {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    throw new Error("CRON_SECRET is not configured");
  }

  return auth === `Bearer ${secret}`;
}
