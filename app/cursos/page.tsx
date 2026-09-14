import Link from "next/link";
import { Courses } from "@/components/landing/courses";
import { getLandingContent } from "@/lib/sanity/fetch";

export default async function CoursesPage() {
  const content = await getLandingContent();
  if (content.courses.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 px-6 text-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Cursos</h1>
          <p className="mt-4 text-gray-400">Todavía no hay cursos publicados.</p>
          <Link href="/" className="mt-6 inline-block text-blue-400">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-6 pt-10">
        <Link href="/" className="text-blue-400">
          Volver al inicio
        </Link>
      </div>
      <Courses courses={content.courses} />
    </div>
  );
}
