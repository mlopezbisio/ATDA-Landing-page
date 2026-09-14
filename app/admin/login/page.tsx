import { signIn } from "@/auth";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const googleReady = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6">
      <div className="w-full max-w-md rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
        <h1 className="text-2xl font-bold text-white">Panel ATDA</h1>
        <p className="mt-3 text-gray-400">Ingresá con una cuenta de Google autorizada.</p>
        {params.error ? (
          <p className="mt-4 text-red-400">No tenés permiso o falló el inicio de sesión.</p>
        ) : null}
        {googleReady ? (
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/admin" });
            }}
          >
            <button
              type="submit"
              className="mt-8 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Continuar con Google
            </button>
          </form>
        ) : (
          <p className="mt-8 text-sm text-amber-300">
            Falta configurar GOOGLE_CLIENT_ID y GOOGLE_CLIENT_SECRET en el entorno.
          </p>
        )}
      </div>
    </div>
  );
}
