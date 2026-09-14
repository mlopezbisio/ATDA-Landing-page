import type { NetworkPartner } from "@/lib/sanity/types";

export function Network({ partners }: { partners: NetworkPartner[] }) {
  if (partners.length === 0) return null;

  return (
    <section id="network" className="bg-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">Nuestra Red</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">
            Construimos alianzas con un ecosistema de instituciones, empresas y organizaciones que potencian el
            desarrollo tecnológico nacional.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
          {partners.map((partner) => {
            const content = (
              <span className="text-xl font-semibold text-gray-500 transition-colors duration-300 hover:text-gray-300">
                {partner.name}
              </span>
            );
            return partner.url ? (
              <a key={partner._id} href={partner.url} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={partner._id}>{content}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
