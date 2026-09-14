export const LANDING_SETTINGS_ID = "landingSettings";

export function isSanityConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
  );
}

export function getSanityEnv() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

  if (!projectId) {
    throw new Error("Falta NEXT_PUBLIC_SANITY_PROJECT_ID");
  }

  return { projectId, dataset };
}
