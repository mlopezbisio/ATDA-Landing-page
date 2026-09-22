import { AdminGoogleSignInButton } from "@/components/admin/google-sign-in-button";
import { AdminSessionProvider } from "@/components/admin/session-provider";

const ERROR_MESSAGES: Record<string, string> = {
  Configuration:
    "Falló la verificación OAuth (cookies/PKCE). Abrí exactamente http://localhost:3000 (no 127.0.0.1), borrá cookies de este sitio e intentá de nuevo.",
  AccessDenied: "Tu cuenta de Google no está en ADMIN_EMAILS.",
  AccessDeniedCallback: "Tu cuenta de Google no está en ADMIN_EMAILS.",
  OAuthAccountNotLinked: "Esa cuenta no está vinculada.",
  OAuthCallback: "Google rechazó el callback. Revisá Client ID/Secret y la URI de redirección.",
  Callback: "Error en el callback de Google.",
  Default: "No tenés permiso o falló el inicio de sesión.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const googleReady = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
  const errorKey = params.error ?? "";
  const errorMessage = errorKey
    ? (ERROR_MESSAGES[errorKey] ?? `${ERROR_MESSAGES.Default} (${errorKey})`)
    : null;

  return (
    <AdminSessionProvider>
      <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6">
        <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
          <h1 className="text-2xl font-bold text-white">Panel ATDA</h1>
          <p className="mt-3 text-gray-400">Ingresá con una cuenta de Google autorizada.</p>
          {errorMessage ? <p className="mt-4 text-red-400">{errorMessage}</p> : null}
          {googleReady ? (
            <AdminGoogleSignInButton />
          ) : (
            <p className="mt-8 text-sm text-amber-300">
              Falta configurar GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET en el entorno.
            </p>
          )}
          <p className="mt-6 text-xs text-gray-500">
            Usá siempre http://localhost:3000 — no 127.0.0.1.
          </p>
        </div>
      </div>
    </AdminSessionProvider>
  );
}
