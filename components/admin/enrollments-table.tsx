"use client";

import { useMemo, useState } from "react";
import { formatARS } from "@/lib/utils";
import type { Enrollment } from "@/lib/sanity/types";

export function EnrollmentsTable({ items }: { items: Enrollment[] }) {
  const [rows, setRows] = useState(items);
  const [statusFilter, setStatusFilter] = useState("all");
  const [message, setMessage] = useState("");

  const visible = useMemo(
    () => rows.filter((row) => (statusFilter === "all" ? true : row.status === statusFilter)),
    [rows, statusFilter],
  );

  const grantAccess = async (id: string) => {
    const notes = prompt("Notas del aula (usuario/enlace asignado a mano)") ?? "";
    const response = await fetch(`/api/admin/enrollments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classroomAccess: "granted", notes }),
    });
    if (!response.ok) {
      setMessage("No se pudo actualizar");
      return;
    }
    setRows((current) =>
      current.map((row) => (row._id === id ? { ...row, classroomAccess: "granted", notes } : row)),
    );
    setMessage("Aula marcada como asignada");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-gray-400">
          Estado de pago
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="ml-2 rounded-md border border-gray-700 bg-gray-900 p-2 text-white"
          >
            <option value="all">Todos</option>
            <option value="pending">Pendiente</option>
            <option value="paid">Pagado</option>
            <option value="underpaid">Pago parcial</option>
            <option value="overpaid">Pago en exceso</option>
            <option value="expired">Expirado</option>
            <option value="failed">Fallido</option>
          </select>
        </label>
        {message ? <p className="text-teal-300">{message}</p> : null}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-gray-300">
          <thead>
            <tr className="border-b border-gray-800 text-gray-400">
              <th className="p-3">Curso</th>
              <th className="p-3">Comprador</th>
              <th className="p-3">Importe</th>
              <th className="p-3">Medio</th>
              <th className="p-3">Pago</th>
              <th className="p-3">Aula</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row._id} className="border-b border-gray-800">
                <td className="p-3">{row.course?.title ?? "—"}</td>
                <td className="p-3">
                  <div>{row.buyer?.name}</div>
                  <div className="text-xs text-gray-500">{row.buyer?.email}</div>
                  <div className="text-xs text-gray-500">DNI {row.buyer?.dni}</div>
                </td>
                <td className="p-3">{formatARS(row.amount)}</td>
                <td className="p-3">{row.provider === "talopay" ? "TaloPay" : "Mercado Pago"}</td>
                <td className="p-3">{row.status}</td>
                <td className="p-3">
                  {row.classroomAccess === "granted" ? "Asignada" : "Pendiente"}
                  {row.notes ? <div className="text-xs text-gray-500">{row.notes}</div> : null}
                </td>
                <td className="p-3">
                  {row.status === "paid" && row.classroomAccess !== "granted" ? (
                    <button
                      type="button"
                      onClick={() => grantAccess(row._id)}
                      className="rounded-md bg-teal-700 px-3 py-1 text-white"
                    >
                      Marcar aula asignada
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
