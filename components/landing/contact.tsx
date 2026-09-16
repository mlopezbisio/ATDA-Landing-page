"use client";

import { useState } from "react";
import type { LandingSettings } from "@/lib/sanity/types";
import { sectionBandClass, sectionCardClass, type SectionBand } from "./section-band";

export function Contact({
  settings,
  band = "alt",
}: {
  settings: LandingSettings;
  band?: SectionBand;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    _subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("submitting");
    try {
      const response = await fetch(settings.formspreeEndpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", _subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const disabled = status === "submitting" || status === "success";

  return (
    <section id="contact" className={`${sectionBandClass(band)} py-20`}>
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">{settings.contactTitle}</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">{settings.contactSubtitle}</p>
        </div>
        <div className={`mx-auto max-w-4xl rounded-lg ${sectionCardClass(band)} p-8 shadow-xl`}>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              <Field label="Nombre" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={disabled}
                  className={inputClass}
                />
              </Field>
              <Field label="Email" htmlFor="email">
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={disabled}
                  className={inputClass}
                />
              </Field>
              <Field label="Número de contacto" htmlFor="phone">
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  disabled={disabled}
                  className={inputClass}
                />
              </Field>
              <Field label="Tema del Contacto" htmlFor="subject">
                <select
                  id="subject"
                  name="_subject"
                  value={formData._subject}
                  onChange={handleChange}
                  required
                  disabled={disabled}
                  className={inputClass}
                >
                  <option value="" disabled>
                    Seleccioná un tema...
                  </option>
                  <option value="Unirme">Unirme/Asociarme</option>
                  <option value="Consulta">Consulta</option>
                  <option value="Propuesta">Propuesta</option>
                  <option value="Otro">Otro</option>
                </select>
              </Field>
            </div>
            <div className="mb-6">
              <Field label="Mensaje" htmlFor="message">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={disabled}
                  className={inputClass}
                />
              </Field>
            </div>
            <div className="flex h-20 items-center justify-center text-center">
              {status === "success" ? (
                <div className="flex animate-pulse flex-col items-center">
                  <div className="mb-1 rounded-full bg-green-500/20 p-2">
                    <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-lg font-semibold text-green-400">¡Enviado! Te vamos a contactar</span>
                </div>
              ) : (
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={`rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 ${
                    status === "submitting" ? "cursor-not-allowed opacity-70" : "hover:bg-blue-700"
                  }`}
                >
                  {status === "submitting" ? "Enviando..." : "Enviar Mensaje"}
                </button>
              )}
            </div>
            {status === "error" ? (
              <p className="mt-4 text-center text-red-400">
                Hubo un error al enviar el mensaje. Por favor intenta nuevamente.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-md border border-gray-600 bg-gray-700 p-3 text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block font-medium text-gray-300">
        {label}
      </label>
      {children}
    </div>
  );
}
