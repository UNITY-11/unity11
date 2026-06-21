const projectFields = `
  _id,
  title,
  slug,
  description,
  status,
  tags,
  bgStart,
  bgEnd,
  mainImage,
  completionDate,
  visibility,
  liveLink,
  _createdAt
`;

const blogListFields = `
  _id,
  title,
  "slug": slug.current,
  author,
  category,
  tags,
  description,
  status,
  views,
  likes,
  mainImage,
  publishedAt,
  _createdAt
`;

const blogDetailFields = `
  ${blogListFields},
  bodyHtml,
  metaTitle,
  metaDescription,
  keywords
`;

export const publishedProjectsQuery = `*[_type == "project"] | order(completionDate desc, _createdAt desc) {
  ${projectFields}
}`;

export const publishedBlogsQuery = `*[_type == "blog" && status == "Published"] | order(publishedAt desc, _createdAt desc) {
  ${blogListFields}
}`;

export const blogBySlugQuery = `*[_type == "blog" && slug.current == $slug && status == "Published"][0] {
  ${blogDetailFields}
}`;

export const blogSlugsQuery = `*[_type == "blog" && status == "Published" && defined(slug.current)] {
  "slug": slug.current
}`;

export const clientsQuery = `*[_type == "client"] | order(_createdAt desc) {
  _id,
  name,
  logo,
  logoUrl,
  website
}`;
