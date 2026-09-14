import { createClient, type ClientConfig } from "@sanity/client";
import { getSanityEnv, isSanityConfigured } from "./env";

function baseConfig(): ClientConfig {
  const { projectId, dataset } = getSanityEnv();
  return {
    projectId,
    dataset,
    apiVersion: "2025-01-01",
    useCdn: false,
  };
}

export function getReadClient() {
  if (!isSanityConfigured()) return null;
  return createClient({
    ...baseConfig(),
    useCdn: true,
    token: process.env.SANITY_API_READ_TOKEN,
  });
}

export function getWriteClient() {
  if (!isSanityConfigured()) {
    throw new Error("Sanity no está configurado");
  }
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) {
    throw new Error("Falta SANITY_API_WRITE_TOKEN");
  }
  return createClient({
    ...baseConfig(),
    useCdn: false,
    token,
  });
}
