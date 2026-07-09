"use server";

import { put } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getDb } from "@/db";
import { articles } from "@/db/schema";
import { verifySession } from "@/lib/dal";

export type CreateArticleState = { error?: string } | undefined;
export type UpdateArticleState = { error?: string } | undefined;

function slugify(title: string) {
  return title
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
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
  const photos = formData.getAll("photos").filter((p): p is File => p instanceof File && p.size > 0);

  if (!title || !date || !excerpt || !body) {
    return { error: "Tous les champs texte sont requis." };
  }

  if (photos.length === 0) {
    return { error: "Au moins une photo est requise." };
  }

  const db = getDb();
  const slug = slugify(title);

  const blobs = await Promise.all(
    photos.map((photo, i) =>
      put(`actualites/${slug}/${Date.now()}-${i}-${slugify(photo.name)}`, photo, {
        access: "public",
      })
    )
  );

  await db.insert(articles).values({
    slug,
    title,
    date,
    excerpt,
    body,
    images: blobs.map((b) => b.url),
    authorId: session.userId,
  });

  revalidatePath("/actualites");
  revalidatePath("/");
  redirect("/admin/actualites");
}

export async function updateArticle(
  _state: UpdateArticleState,
  formData: FormData
): Promise<UpdateArticleState> {
  await verifySession();

  const id = Number(formData.get("id"));
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "")
    .trim()
    .replace(/\r\n/g, "\n");
  const keptImages = formData.getAll("keptImages").map(String);
  const newPhotos = formData.getAll("photos").filter((p): p is File => p instanceof File && p.size > 0);

  if (!id || !title || !date || !excerpt || !body) {
    return { error: "Tous les champs texte sont requis." };
  }

  const db = getDb();
  const [existing] = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  if (!existing) {
    return { error: "Actualité introuvable." };
  }

  const uploaded = await Promise.all(
    newPhotos.map((photo, i) =>
      put(`actualites/${existing.slug}/${Date.now()}-${i}-${slugify(photo.name)}`, photo, {
        access: "public",
      })
    )
  );

  const images = [...keptImages, ...uploaded.map((b) => b.url)];

  if (images.length === 0) {
    return { error: "Au moins une photo est requise." };
  }

  await db.update(articles).set({ title, date, excerpt, body, images }).where(eq(articles.id, id));

  revalidatePath("/actualites");
  revalidatePath(`/actualites/${existing.slug}`);
  revalidatePath("/");
  redirect("/admin/actualites");
}

export async function deleteArticle(formData: FormData) {
  await verifySession();

  const id = Number(formData.get("id"));
  if (!id) return;

  const db = getDb();
  const [existing] = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  await db.delete(articles).where(eq(articles.id, id));

  revalidatePath("/actualites");
  revalidatePath("/");
  if (existing) revalidatePath(`/actualites/${existing.slug}`);
  redirect("/admin/actualites");
}
