import { auth } from "./auth.ts";
import { headers } from "next/headers";

export async function getSession() {
  try {
    const reqHeaders = await headers();

    const session = await auth.api.getSession({
      headers: Object.fromEntries(reqHeaders.entries()),
    });

    return session || null;
  } catch {
    
    return null;
  }
}
