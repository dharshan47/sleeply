import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptSync = promisify(scrypt);

export async function hashpassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptSync(password, salt, 64)) as Buffer;
  return `${salt}:${derivedKey.toString("hex")}`;
}

// Verify password
export async function verifyPassword({
  password,
  hash,
}: {
  password: string;
  hash: string;
}): Promise<boolean> {
  const [salt, key] = hash.split(":");
  if (!salt || !key) return false;
  const derivedKey = (await scryptSync(password, salt, 64)) as Buffer;
  return key === derivedKey.toString("hex");
}
