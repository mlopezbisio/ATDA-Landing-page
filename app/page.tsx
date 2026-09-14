import { About } from "@/components/landing/about";
import { Contact } from "@/components/landing/contact";
import { Courses } from "@/components/landing/courses";
import { FocusAreas } from "@/components/landing/focus-areas";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { JoinUs } from "@/components/landing/join-us";
import { Network } from "@/components/landing/network";
import { Projects } from "@/components/landing/projects";
import { getLandingContent } from "@/lib/sanity/fetch";
import type { NavLink } from "@/lib/sanity/types";

export default async function HomePage() {
  const content = await getLandingContent();
  const links: NavLink[] = [
    { name: "Sobre Nosotros", href: "#about" },
    ...(content.focusAreas.length ? [{ name: "Áreas de Enfoque", href: "#focus-areas" }] : []),
    ...(content.projects.length ? [{ name: "Actividad", href: "#projects" }] : []),
    ...(content.partners.length ? [{ name: "Red", href: "#network" }] : []),
    ...(content.courses.length ? [{ name: "Cursos", href: "#cursos" }] : []),
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Header links={links} />
      <main>
        <Hero settings={content.settings} />
        <About settings={content.settings} />
        <FocusAreas areas={content.focusAreas} />
        <Projects projects={content.projects} />
        <Network partners={content.partners} />
        <Courses courses={content.courses} />
        <JoinUs settings={content.settings} />
        <Contact settings={content.settings} />
      </main>
      <Footer settings={content.settings} />
    </div>
  );
}
