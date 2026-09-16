import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { getCourseBySlug, getLandingContent } from "@/lib/sanity/fetch";
import { formatARS } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const [course, landing] = await Promise.all([getCourseBySlug(slug), getLandingContent()]);
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-gray-900 px-6 py-16">
      <div className="container mx-auto max-w-5xl">
        <Link href="/cursos" className="text-blue-400 hover:text-blue-300">
          ← Volver a Cursos
        </Link>
        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-wide text-teal-400">
              {landing.settings.aboutTitle ? "Curso ATDA" : "Curso"}
            </p>
            <h1 className="mt-2 text-4xl font-extrabold text-white">{course.title}</h1>
            <p className="mt-4 text-lg text-gray-300">{course.description}</p>
            <p className="mt-6 text-3xl font-bold text-teal-300">{formatARS(course.price)}</p>
          </div>
          <CheckoutForm course={course} />
        </div>
      </div>
    </div>
  );
}
