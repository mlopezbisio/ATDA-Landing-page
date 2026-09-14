import { CollectionManager } from "@/components/admin/collection-manager";
import { listDocumentsSafe } from "@/lib/sanity/write";
import { slugify } from "@/lib/utils";

export default async function AdminCoursesPage() {
  const items = (await listDocumentsSafe("course")) as Array<Record<string, unknown> & { _id: string }>;

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-white">Cursos</h1>
      <p className="mb-6 text-gray-400">Un curso aparece en la landing si está activo y tiene precio.</p>
      <CollectionManager
        type="course"
        items={items.map((item) => ({ ...item, slug: item.slug ?? "" }))}
        transform={(form) => {
          const title = String(form.get("title") ?? "");
          const slugValue = String(form.get("slug") ?? "") || slugify(title);
          return {
            title,
            slug: { _type: "slug", current: slugValue },
            description: String(form.get("description") ?? ""),
            price: Number(form.get("price") ?? 0),
            imageUrl: String(form.get("imageUrl") ?? ""),
            quota: form.get("quota") ? Number(form.get("quota")) : undefined,
            active: form.get("active") === "on",
          };
        }}
        fields={[
          { name: "title", label: "Título" },
          { name: "slug", label: "Slug" },
          { name: "price", label: "Precio ARS", type: "number" },
          { name: "quota", label: "Cupo (opcional)", type: "number" },
          { name: "imageUrl", label: "URL de imagen" },
          { name: "description", label: "Descripción", type: "textarea" },
          { name: "active", label: "Activo", type: "checkbox" },
        ]}
      />
    </div>
  );
}
