import { unstable_cache } from "next/cache";
import { getReadClient } from "./client";
import { defaultLandingSettings } from "./defaults";
import { isSanityConfigured } from "./env";
import {
  courseByIdQuery,
  courseBySlugQuery,
  coursesQuery,
  enrollmentByIdQuery,
  enrollmentsQuery,
  focusAreasQuery,
  landingSettingsQuery,
  partnersQuery,
  projectsQuery,
} from "./queries";
import type {
  Course,
  Enrollment,
  FocusArea,
  LandingContent,
  LandingSettings,
  NetworkPartner,
  Project,
} from "./types";

const emptyLanding = (): LandingContent => ({
  settings: defaultLandingSettings,
  focusAreas: [],
  projects: [],
  partners: [],
  courses: [],
});

async function loadLandingContent(): Promise<LandingContent> {
  const client = getReadClient();
  if (!client) return emptyLanding();

  try {
    const [settings, focusAreas, projects, partners, courses] = await Promise.all([
      client.fetch<LandingSettings | null>(landingSettingsQuery),
      client.fetch<FocusArea[]>(focusAreasQuery),
      client.fetch<Project[]>(projectsQuery),
      client.fetch<NetworkPartner[]>(partnersQuery),
      client.fetch<Course[]>(coursesQuery),
    ]);

    return {
      settings: {
        ...defaultLandingSettings,
        ...(settings ?? {}),
        aboutValues: settings?.aboutValues?.length
          ? settings.aboutValues
          : defaultLandingSettings.aboutValues,
        joinBenefits: settings?.joinBenefits?.length
          ? settings.joinBenefits
          : defaultLandingSettings.joinBenefits,
        joinEligibility: settings?.joinEligibility?.length
          ? settings.joinEligibility
          : defaultLandingSettings.joinEligibility,
      },
      focusAreas: focusAreas ?? [],
      projects: projects ?? [],
      partners: partners ?? [],
      courses: courses ?? [],
    };
  } catch (error) {
    console.error("Error al leer Sanity", error);
    return emptyLanding();
  }
}

export const getLandingContent = unstable_cache(loadLandingContent, ["landing-content"], {
  tags: ["landing"],
  revalidate: 60,
});

export async function getCourseBySlug(slug: string) {
  const client = getReadClient();
  if (!client) return null;
  return client.fetch<Course | null>(courseBySlugQuery, { slug });
}

export async function getCourseById(id: string) {
  const client = getReadClient();
  if (!client) return null;
  return client.fetch<Course | null>(courseByIdQuery, { id });
}

export async function getEnrollmentById(id: string) {
  const client = getReadClient();
  if (!client) return null;
  return client.fetch<Enrollment | null>(enrollmentByIdQuery, { id });
}

export async function getEnrollmentByIdFresh(id: string) {
  try {
    const { getWriteClient } = await import("./client");
    return getWriteClient().fetch<Enrollment | null>(enrollmentByIdQuery, { id });
  } catch {
    return getEnrollmentById(id);
  }
}

export async function getEnrollments() {
  const client = getReadClient();
  if (!client) return [] as Enrollment[];
  return client.fetch<Enrollment[]>(enrollmentsQuery);
}

export function isSanityReady() {
  return isSanityConfigured();
}
