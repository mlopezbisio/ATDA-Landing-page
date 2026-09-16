import type { FocusArea } from "@/lib/sanity/types";
import { FocusIconView } from "./icon-map";
import { sectionBandClass, sectionCardClass, type SectionBand } from "./section-band";

export function FocusAreas({ areas, band = "alt" }: { areas: FocusArea[]; band?: SectionBand }) {
  if (areas.length === 0) return null;

  return (
    <section id="focus-areas" className={`${sectionBandClass(band)} py-20`}>
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">Nuestras Áreas de Enfoque</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">
            Aportamos una perspectiva técnica en sectores estratégicos, concentrando nuestros esfuerzos en áreas clave
            para el crecimiento soberano y sostenible de Argentina.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area._id}
              className={`flex flex-col items-center rounded-xl ${sectionCardClass(band)} p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-teal-500/20`}
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-teal-600/20">
                <FocusIconView name={area.icon} className="h-10 w-10 text-teal-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">{area.title}</h3>
              <p className="text-gray-400">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
