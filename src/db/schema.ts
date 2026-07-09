import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  images: text("images").array().notNull(),
  resultsHtml: text("results_html"),
  authorId: uuid("author_id")
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
