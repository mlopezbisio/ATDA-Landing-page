import { CollectionManager } from "@/components/admin/collection-manager";
import { listDocumentsSafe } from "@/lib/sanity/write";

export default async function AdminAreasPage() {
  const items = (await listDocumentsSafe("focusArea")) as Array<Record<string, unknown> & { _id: string }>;

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">Áreas de enfoque</h1>
      <p className="mb-6 text-gray-400">Si no hay áreas, la sección no aparece en la landing ni en el menú.</p>
      <CollectionManager
        type="focusArea"
        items={items}
        fields={[
          { name: "title", label: "Título" },
          {
            name: "icon",
            label: "Ícono",
            type: "select",
            options: [
              { value: "energy", label: "Energía" },
              { value: "industry40", label: "Industria 4.0" },
              { value: "biotech", label: "Biotecnología" },
            ],
          },
          { name: "description", label: "Descripción", type: "textarea" },
        ]}
      />
    </div>
  );
}
