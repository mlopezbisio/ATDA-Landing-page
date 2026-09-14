import { CollectionManager } from "@/components/admin/collection-manager";
import { listDocumentsSafe } from "@/lib/sanity/write";

export default async function AdminProjectsPage() {
  const items = (await listDocumentsSafe("project")) as Array<Record<string, unknown> & { _id: string }>;

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">Actividad</h1>
      <p className="mb-6 text-gray-400">Solo se muestra en el sitio si está marcada como publicada.</p>
      <CollectionManager
        type="project"
        items={items}
        fields={[
          { name: "title", label: "Título" },
          { name: "category", label: "Categoría" },
          { name: "imageUrl", label: "URL de imagen" },
          { name: "description", label: "Descripción", type: "textarea" },
          { name: "published", label: "Publicado", type: "checkbox" },
        ]}
      />
    </div>
  );
}
