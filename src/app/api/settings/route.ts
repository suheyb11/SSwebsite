import { getSettings } from "@/lib/db";
import { ok } from "@/lib/api";

/** GET /api/settings — site-wide contact details and social links. */
export async function GET() {
  const settings = await getSettings();
  return ok(settings);
}
