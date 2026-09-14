"use client";

import { useMemo, useState } from "react";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "select";
  options?: Array<{ value: string; label: string }>;
};

type Item = Record<string, unknown> & { _id: string };

export function CollectionManager({
  type,
  fields,
  items,
  titleField = "title",
  transform,
}: {
  type: string;
  fields: Field[];
  items: Item[];
  titleField?: string;
  transform?: (form: FormData) => Record<string, unknown>;
}) {
  const [rows, setRows] = useState(items);
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const editing = useMemo(() => rows.find((row) => row._id === editingId), [rows, editingId]);

  const readForm = (form: FormData) => {
    if (transform) return transform(form);
    const data: Record<string, unknown> = {};
    for (const field of fields) {
      if (field.type === "checkbox") {
        data[field.name] = form.get(field.name) === "on";
      } else if (field.type === "number") {
        const value = form.get(field.name);
        data[field.name] = value ? Number(value) : undefined;
      } else {
        data[field.name] = String(form.get(field.name) ?? "");
      }
    }
    return data;
  };

  const refresh = async () => {
    const response = await fetch(`/api/admin/content?type=${type}`);
    const data = (await response.json()) as { items?: Item[] };
    setRows(data.items ?? []);
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = readForm(new FormData(event.currentTarget));
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data: payload }),
    });
    setStatus(response.ok ? "Creado. La sección se verá en la landing." : "No se pudo crear");
    if (response.ok) {
      event.currentTarget.reset();
      await refresh();
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingId) return;
    const payload = readForm(new FormData(event.currentTarget));
    const response = await fetch(`/api/admin/content/${editingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setStatus(response.ok ? "Actualizado" : "No se pudo actualizar");
    if (response.ok) {
      setEditingId(null);
      await refresh();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este contenido?")) return;
    const response = await fetch(`/api/admin/content/${id}`, { method: "DELETE" });
    setStatus(response.ok ? "Eliminado" : "No se pudo eliminar");
    if (response.ok) await refresh();
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleCreate} className="space-y-3 rounded-lg border border-gray-800 p-4">
        <h3 className="font-semibold text-white">Nuevo</h3>
        <FieldGrid fields={fields} />
        <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          Crear
        </button>
      </form>
      {status ? <p className="text-teal-300">{status}</p> : null}
      <ul className="space-y-3">
        {rows.map((row) => (
          <li key={row._id} className="rounded-lg border border-gray-800 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium text-white">{String(row[titleField] ?? row._id)}</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="text-sm text-blue-300"
                  onClick={() => setEditingId(row._id === editingId ? null : row._id)}
                >
                  Editar
                </button>
                <button type="button" className="text-sm text-red-400" onClick={() => handleDelete(row._id)}>
                  Borrar
                </button>
              </div>
            </div>
            {editingId === row._id && editing ? (
              <form onSubmit={handleUpdate} className="mt-4 space-y-3">
                <FieldGrid fields={fields} values={editing} />
                <button type="submit" className="rounded-md bg-teal-600 px-4 py-2 text-white">
                  Guardar cambios
                </button>
              </form>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function FieldGrid({ fields, values }: { fields: Field[]; values?: Item }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {fields.map((field) => {
        const value = values?.[field.name];
        if (field.type === "textarea") {
          return (
            <label key={field.name} className="md:col-span-2">
              <span className="mb-1 block text-sm text-gray-400">{field.label}</span>
              <textarea
                name={field.name}
                defaultValue={typeof value === "string" ? value : ""}
                rows={4}
                className="w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-white"
              />
            </label>
          );
        }
        if (field.type === "checkbox") {
          return (
            <label key={field.name} className="flex items-center gap-2 text-gray-300">
              <input name={field.name} type="checkbox" defaultChecked={Boolean(value)} />
              {field.label}
            </label>
          );
        }
        if (field.type === "select") {
          return (
            <label key={field.name}>
              <span className="mb-1 block text-sm text-gray-400">{field.label}</span>
              <select
                name={field.name}
                defaultValue={typeof value === "string" ? value : field.options?.[0]?.value}
                className="w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-white"
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          );
        }
        if (field.name === "imageUrl" || field.name === "logoUrl") {
          return (
            <ImageUrlField
              key={field.name}
              name={field.name}
              label={field.label}
              defaultValue={typeof value === "string" ? value : ""}
            />
          );
        }
        return (
          <label key={field.name}>
            <span className="mb-1 block text-sm text-gray-400">{field.label}</span>
            <input
              name={field.name}
              type={field.type === "number" ? "number" : "text"}
              defaultValue={value == null ? "" : String(value)}
              className="w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-white"
            />
          </label>
        );
      })}
    </div>
  );
}

function ImageUrlField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  const [url, setUrl] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = (await response.json()) as { url?: string };
    if (data.url) setUrl(data.url);
    setUploading(false);
  };

  return (
    <label className="md:col-span-2">
      <span className="mb-1 block text-sm text-gray-400">{label}</span>
      <input
        name={name}
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        className="w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-white"
      />
      <input
        type="file"
        accept="image/*"
        className="mt-2 text-sm text-gray-400"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
      {uploading ? <span className="ml-2 text-xs text-gray-500">Subiendo...</span> : null}
    </label>
  );
}
