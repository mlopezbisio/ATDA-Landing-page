"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/contenido", label: "Landing" },
  { href: "/admin/areas", label: "Áreas" },
  { href: "/admin/proyectos", label: "Actividad" },
  { href: "/admin/red", label: "Red" },
  { href: "/admin/cursos", label: "Cursos" },
  { href: "/admin/inscripciones", label: "Inscripciones" },
  { href: "/admin/socios", label: "Socios" },
];

export function AdminNav({ email }: { email?: string | null }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col border-b border-gray-800 bg-gray-950 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="border-b border-gray-800 p-6">
        <p className="text-sm uppercase tracking-wide text-teal-400">ATDA Admin</p>
        <p className="mt-1 truncate text-sm text-gray-400">{email}</p>
      </div>
      <nav className="flex flex-wrap gap-2 p-4 md:flex-col">
        {links.map((link) => {
          const active =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm ${
                active ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto p-4">
        <Link href="/" className="mb-3 block text-sm text-gray-400 hover:text-white">
          Ver sitio
        </Link>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full rounded-md border border-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800"
        >
          Salir
        </button>
      </div>
    </aside>
  );
}
