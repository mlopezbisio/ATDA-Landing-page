import Link from "next/link";
import { formatARS } from "@/lib/utils";
import type { Course } from "@/lib/sanity/types";

export function Courses({ courses }: { courses: Course[] }) {
  if (courses.length === 0) return null;

  return (
    <section id="cursos" className="bg-gray-800/30 py-20">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-white md:text-4xl">Cursos</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">
            Formaciones de ATDA. Inscribite con tarjeta, billetera Mercado Pago o transferencia inmediata.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <article key={course._id} className="flex flex-col rounded-xl bg-gray-800 p-6 shadow-lg">
              {course.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={course.imageUrl} alt={course.title} className="mb-4 h-44 w-full rounded-lg object-cover" />
              ) : null}
              <h3 className="text-xl font-bold text-white">{course.title}</h3>
              <p className="mt-2 flex-1 text-gray-400">{course.description}</p>
              <p className="mt-4 text-2xl font-extrabold text-teal-300">{formatARS(course.price)}</p>
              <Link
                href={`/cursos/${course.slug}`}
                className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2 text-center font-semibold text-white hover:bg-blue-700"
              >
                Inscribirme
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
