"use server"

import { client } from "@/sanity/lib/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProject(prevState: any, formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const status = formData.get("status") as string
    const tagsRaw = formData.get("tags") as string
    const tags = tagsRaw ? JSON.parse(tagsRaw) : []
    const image = formData.get("image") as File | null

    if (!title) {
      return { error: "Title is required" }
    }

    if (!process.env.SANITY_API_TOKEN) {
        return { error: "SANITY_API_TOKEN is missing in .env.local" }
    }

    // Initialize write client
    const writeClient = client.withConfig({
      token: process.env.SANITY_API_TOKEN,
      useCdn: false, // Don't use CDN for writes
    })

    let imageAsset = null

    // Upload image if it exists
    if (image && image.size > 0) {
      const bytes = await image.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      imageAsset = await writeClient.assets.upload('image', buffer, {
        filename: image.name,
      })
    }

    // Convert title to a basic slug
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")

    // Create the document matching the schema
    const doc = {
      _type: "project",
      title,
      slug: {
        _type: "slug",
        current: slug,
      },
      description,
      // Passing status and tags even though they aren't fully declared in schema yet, 
      // Sanity will save them and they can be added to the schema visually later.
      status,
      tags,
      ...(imageAsset && {
        mainImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
      }),
    }

    await writeClient.create(doc)

  } catch (error: any) {
    console.error("Failed to create project:", error)
    return { error: error.message || "Failed to create project." }
  }

  revalidatePath("/projects")
  redirect("/projects")
}
