import { client } from "./client";

export function getWriteClient() {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    throw new Error("SANITY_API_TOKEN is missing in environment variables");
  }

  return client.withConfig({
    token,
    useCdn: false,
  });
}
