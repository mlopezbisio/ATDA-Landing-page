"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function AdminGoogleSignInButton() {
  const [busy, setBusy] = useState(false);

  const onClick = async () => {
    if (typeof window !== "undefined" && window.location.hostname === "127.0.0.1") {
      window.location.replace(
        `http://localhost:${window.location.port || "3000"}/admin/login`,
      );
      return;
    }
    setBusy(true);
    await signIn("google", { callbackUrl: "/admin" });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="mt-8 inline-block w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
    >
      {busy ? "Redirigiendo a Google…" : "Continuar con Google"}
    </button>
  );
}
