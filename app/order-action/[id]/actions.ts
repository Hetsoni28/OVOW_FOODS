"use server";

export async function verifyAdminPin(pin: string) {
  // In Vercel, you can set ADMIN_PIN in the environment variables.
  // We use a fallback so it works immediately.
  const correctPin = process.env.ADMIN_PIN || "7566";
  return pin === correctPin;
}
