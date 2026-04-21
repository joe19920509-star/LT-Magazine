import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  coverImage?: string;
  author: string;
  readTime: string;
  column?: string;
  content?: string;
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles = fileNames
    .filter((fn) => fn.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);
      return {
        slug,
        title: data.title || slug,
        date: data.date || "",
        category: data.category || "",
        excerpt: data.excerpt || "",
        coverImage: data.coverImage,
        author: data.author || "LT Magazine",
        readTime: data.readTime || "5 min read",
        column: data.column || "",
      } as Article;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  if (!fs.existsSync(articlesDirectory)) {
    return null;
  }
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      category: data.category || "",
      excerpt: data.excerpt || "",
      coverImage: data.coverImage,
      author: data.author || "LT Magazine",
      readTime: data.readTime || "5 min read",
      column: data.column || "",
      content,
    };
  } catch {
    return null;
  }
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function getArticlesByColumn(column: string): Article[] {
  return getAllArticles().filter(
    (a) => a.column?.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === column.toLowerCase()
  );
}

export const COLUMN_MAP: Record<string, { label: string; slug: string }> = {
  "lab-to-market": { label: "Lab to Market", slug: "lab-to-market" },
  "long-term-short-term": { label: "Long Term & Short Term", slug: "long-term-short-term" },
  "fast-slow": { label: "Fast & Slow", slug: "fast-slow" },
};

export const ALL_COLUMNS = [
  { label: "Lab to Market", slug: "lab-to-market" },
  { label: "Long Term & Short Term", slug: "long-term-short-term" },
  { label: "Fast & Slow", slug: "fast-slow" },
];
