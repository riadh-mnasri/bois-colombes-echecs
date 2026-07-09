"use server";

import { put } from "@vercel/blob";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { articles } from "@/db/schema";
import { verifySession } from "@/lib/dal";

export type CreateArticleState = { error?: string } | undefined;

function slugify(title: string) {
  return title
    .normalize("NFD")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createArticle(
  _state: CreateArticleState,
  formData: FormData
): Promise<CreateArticleState> {
  const session = await verifySession();

  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "")
    .trim()
    .replace(/\r\n/g, "\n");
  const photo = formData.get("photo");

  if (!title || !date || !excerpt || !body) {
    return { error: "Tous les champs texte sont requis." };
  }

  if (!(photo instanceof File) || photo.size === 0) {
    return { error: "Une photo est requise." };
  }

  const db = getDb();
  const slug = slugify(title);

  const blob = await put(`actualites/${Date.now()}-${slugify(photo.name)}`, photo, {
    access: "public",
  });

  await db.insert(articles).values({
    slug,
    title,
    date,
    excerpt,
    body,
    image: blob.url,
    authorId: session.userId,
  });

  revalidatePath("/actualites");
  revalidatePath("/");
  redirect("/admin/actualites");
}
