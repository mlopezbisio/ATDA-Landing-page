import type { Project } from "@/lib/sanity/types";

export function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="bg-gray-800/30 py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">Actividad</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">
            Iniciativas que marcan la diferencia, impulsando la innovación y la competitividad de la industria
            argentina.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project._id}
              className="group overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              {project.imageUrl ? (
                <div className="relative h-56 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/20" />
                </div>
              ) : null}
              <div className="p-6">
                {project.category ? (
                  <span className="mb-3 inline-block rounded-full bg-blue-600/20 px-3 py-1 text-xs font-semibold text-blue-300">
                    {project.category}
                  </span>
                ) : null}
                <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
                <p className="text-base text-gray-400">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
