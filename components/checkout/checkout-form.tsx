"use client";

import { useState } from "react";
import { formatARS } from "@/lib/utils";
import type { Course } from "@/lib/sanity/types";

export function CheckoutForm({ course }: { course: Course }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");
  const [method, setMethod] = useState<"mercadopago" | "talopay">("mercadopago");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      courseId: course._id,
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      dni: String(form.get("dni") ?? ""),
      phone: String(form.get("phone") ?? ""),
    };

    try {
      const response = await fetch(
        method === "mercadopago" ? "/api/checkout/mercadopago" : "/api/checkout/talo",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = (await response.json()) as { error?: string; initPoint?: string; enrollmentId?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo iniciar el pago");
      }
      if (method === "mercadopago" && data.initPoint) {
        window.location.href = data.initPoint;
        return;
      }
      if (data.enrollmentId) {
        window.location.href = `/checkout/talo/${data.enrollmentId}`;
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error inesperado");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl bg-gray-800 p-6 shadow-xl">
      <p className="text-lg text-gray-300">
        Importe: <span className="font-bold text-white">{formatARS(course.price)}</span>
      </p>
      <Input name="name" label="Nombre y apellido" required />
      <Input name="email" type="email" label="Email" required />
      <Input name="dni" label="DNI" required />
      <Input name="phone" type="tel" label="Teléfono" required />
      <fieldset className="space-y-3">
        <legend className="mb-2 font-medium text-gray-300">Medio de pago</legend>
        <label className="flex items-start gap-3 rounded-lg border border-gray-700 p-3">
          <input
            type="radio"
            name="method"
            checked={method === "mercadopago"}
            onChange={() => setMethod("mercadopago")}
          />
          <span>
            <span className="block font-semibold text-white">Mercado Pago</span>
            <span className="text-sm text-gray-400">Tarjetas de crédito/débito y billetera virtual</span>
          </span>
        </label>
        <label className="flex items-start gap-3 rounded-lg border border-gray-700 p-3">
          <input type="radio" name="method" checked={method === "talopay"} onChange={() => setMethod("talopay")} />
          <span>
            <span className="block font-semibold text-white">Transferencia inmediata (TaloPay)</span>
            <span className="text-sm text-gray-400">CVU / alias dinámico</span>
          </span>
        </label>
      </fieldset>
      {error ? <p className="text-red-400">{error}</p> : null}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
      >
        {status === "submitting" ? "Generando pago..." : "Continuar al pago"}
      </button>
      <p className="text-xs text-gray-500">
        El acceso al aula virtual lo asigna un administrador de ATDA después de acreditar el pago.
      </p>
    </form>
  );
}

function Input({
  name,
  label,
  type = "text",
  required,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-medium text-gray-300">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
  );
}
