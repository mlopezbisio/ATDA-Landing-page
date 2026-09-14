import { LANDING_SETTINGS_ID } from "./env";

export const landingSettingsQuery = `*[_id == "${LANDING_SETTINGS_ID}"][0]{
  _id,
  heroTitle,
  heroSubtitle,
  heroImageUrl,
  aboutTitle,
  aboutBody,
  aboutValues,
  joinTitle,
  joinSubtitle,
  joinBenefits,
  joinEligibility,
  joinCtaText,
  joinCtaLabel,
  contactTitle,
  contactSubtitle,
  formspreeEndpoint,
  footerText,
  socialTwitter,
  socialInstagram,
  socialLinkedin,
  contactEmail,
  statuteUrl
}`;

export const focusAreasQuery = `*[_type == "focusArea"] | order(_createdAt asc){
  _id,
  title,
  description,
  icon
}`;

export const projectsQuery = `*[_type == "project" && published == true] | order(_createdAt desc){
  _id,
  title,
  description,
  category,
  imageUrl,
  published
}`;

export const allProjectsQuery = `*[_type == "project"] | order(_createdAt desc){
  _id,
  title,
  description,
  category,
  imageUrl,
  published
}`;

export const partnersQuery = `*[_type == "networkPartner"] | order(name asc){
  _id,
  name,
  url,
  logoUrl
}`;

export const coursesQuery = `*[_type == "course" && active == true && defined(price)] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  description,
  price,
  active,
  imageUrl,
  quota
}`;

export const allCoursesQuery = `*[_type == "course"] | order(_createdAt desc){
  _id,
  title,
  "slug": slug.current,
  description,
  price,
  active,
  imageUrl,
  quota
}`;

export const courseBySlugQuery = `*[_type == "course" && slug.current == $slug && active == true][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  price,
  active,
  imageUrl,
  quota
}`;

export const courseByIdQuery = `*[_type == "course" && _id == $id][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  price,
  active,
  imageUrl,
  quota
}`;

export const enrollmentsQuery = `*[_type == "enrollment"] | order(_createdAt desc){
  _id,
  "course": course->{ _id, title, "slug": slug.current },
  buyer,
  amount,
  currency,
  provider,
  providerPaymentId,
  status,
  classroomAccess,
  notes,
  taloCvu,
  taloAlias,
  taloPaymentUrl,
  "createdAt": _createdAt
}`;

export const enrollmentByIdQuery = `*[_type == "enrollment" && _id == $id][0]{
  _id,
  "course": course->{ _id, title, "slug": slug.current },
  buyer,
  amount,
  currency,
  provider,
  providerPaymentId,
  status,
  classroomAccess,
  notes,
  taloCvu,
  taloAlias,
  taloPaymentUrl,
  "createdAt": _createdAt
}`;
