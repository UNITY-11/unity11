import { client } from "./client";
import { mapSanityBlog, mapSanityClientLogo, mapSanityProject } from "./mappers";
import {
  blogBySlugQuery,
  blogSlugsQuery,
  clientsQuery,
  publishedBlogsQuery,
  publishedProjectsQuery,
  featuredProjectsQuery,
} from "./queries";

export async function fetchPublishedProjects() {
  const docs = await client.fetch(publishedProjectsQuery);
  console.log("Fetched raw projects from Sanity:", docs);
  return docs.map(mapSanityProject);
}

export async function fetchFeaturedProjects() {
  const docs = await client.fetch(featuredProjectsQuery);
  return docs.map(mapSanityProject);
}

export async function fetchPublishedBlogs() {
  const docs = await client.fetch(publishedBlogsQuery);
  return docs.map((doc: Parameters<typeof mapSanityBlog>[0], index: number) =>
    mapSanityBlog(doc, index)
  );
}

export async function fetchBlogBySlug(slug: string) {
  const doc = await client.fetch(blogBySlugQuery, { slug });
  return doc ? mapSanityBlog(doc) : null;
}

export async function fetchBlogSlugs() {
  const docs = await client.fetch<{ slug: string }[]>(blogSlugsQuery);
  return docs.map((doc) => doc.slug).filter(Boolean);
}

export async function fetchClientLogos() {
  const docs = await client.fetch(clientsQuery);
  return docs.map(mapSanityClientLogo);
}
