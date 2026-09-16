import { normalizeExternalUrl } from "@/lib/utils";
import type { NetworkPartner } from "@/lib/sanity/types";
import { sectionBandClass, type SectionBand } from "./section-band";

function PartnerTile({ partner }: { partner: NetworkPartner }) {
  const href = normalizeExternalUrl(partner.url);
  const inner = (
    <>
      <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white p-3 shadow-sm sm:h-32 sm:w-32">
        {partner.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={partner.logoUrl} alt="" className="max-h-full max-w-full object-contain" />
        ) : (
          <span className="text-2xl font-bold text-slate-700">{partner.name.slice(0, 1)}</span>
        )}
      </div>
      <p className="mt-4 max-w-[11rem] text-center text-sm font-semibold leading-snug text-white sm:text-base">
        {partner.name}
      </p>
    </>
  );

  const className =
    "flex flex-col items-center justify-start transition duration-300 hover:-translate-y-1";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} title={partner.name}>
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

export function Network({ partners, band = "alt" }: { partners: NetworkPartner[]; band?: SectionBand }) {
  if (partners.length === 0) return null;

  return (
    <section id="network" className={`${sectionBandClass(band)} py-20`}>
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">Nuestra Red</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">
            Construimos alianzas con un ecosistema de instituciones, empresas y organizaciones que potencian el
            desarrollo tecnológico nacional.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {partners.map((partner) => (
            <PartnerTile key={partner._id} partner={partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
