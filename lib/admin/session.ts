import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/utils";

export async function getAdminSession() {
  const session = await auth();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return null;
  }
  return session;
}

export async function requireAdminApi() {
  const session = await getAdminSession();
  if (!session) {
    return { session: null, error: Response.json({ error: "No autorizado" }, { status: 401 }) };
  }
  return { session, error: null };
}
