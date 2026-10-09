import { Header } from "@/components/landing/header";
import { getLandingContent } from "@/lib/sanity/fetch";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getLandingContent();

  return (
    <>
      <Header
        showNetwork={content.partners.length > 0}
        showCourses={content.courses.length > 0}
      />
      {children}
    </>
  );
}
