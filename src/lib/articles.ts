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
  content?: string;
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return getSampleArticles();
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
        category: data.category || "未分类",
        excerpt: data.excerpt || "",
        coverImage: data.coverImage,
        author: data.author || "LTMagazine",
        readTime: data.readTime || "5 min read",
      } as Article;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  if (!fs.existsSync(articlesDirectory)) {
    const samples = getSampleArticles();
    return samples.find((a) => a.slug === slug) || null;
  }
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      category: data.category || "未分类",
      excerpt: data.excerpt || "",
      coverImage: data.coverImage,
      author: data.author || "LTMagazine",
      readTime: data.readTime || "5 min read",
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

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(
    (a) => a.category.toLowerCase() === category.toLowerCase()
  );
}

function getSampleArticles(): Article[] {
  return [
    {
      slug: "ai-reshaping-business-2026",
      title: "AI 如何重塑 2026 年的商业格局",
      date: "2026-04-20",
      category: "科技",
      excerpt:
        "从 ChatGPT 到 Agent，AI 已从概念验证走向规模化落地。本文探讨 AI 在不同商业场景中的实际影响。",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200",
      author: "LTMagazine",
      readTime: "8 min read",
    },
    {
      slug: "startup-funding-winter",
      title: "资本寒冬中，创业公司如何生存？",
      date: "2026-04-18",
      category: "商业",
      excerpt:
        "融资环境收紧，估值回调，创业公司面临前所未有的挑战。但这也许是回归商业本质的最佳时机。",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200",
      author: "LTMagazine",
      readTime: "6 min read",
    },
    {
      slug: "remote-work-3-years-later",
      title: "远程办公三年后：哪些变了，哪些没变",
      date: "2026-04-15",
      category: "商业",
      excerpt:
        "疫情改变了工作方式，但混合办公的真相比想象复杂。数据和真实案例告诉我们什么真正有效。",
      coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
      author: "LTMagazine",
      readTime: "7 min read",
    },
    {
      slug: "china-ev-market-2026",
      title: "中国电动车市场 2026：内卷之后的格局重塑",
      date: "2026-04-12",
      category: "科技",
      excerpt:
        "价格战告一段落，续航不再是瓶颈。智能驾驶成为新战场，比亚迪和造车新势力走向何方？",
      coverImage: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1200",
      author: "LTMagazine",
      readTime: "9 min read",
    },
    {
      slug: "creator-economy-deep-dive",
      title: "创作者经济深层解析：谁在赚钱，赚多少钱",
      date: "2026-04-10",
      category: "商业",
      excerpt:
        "从广告分成到付费订阅，从带货到 IP 授权。创作者经济的变现路径比想象中更复杂。",
      coverImage: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200",
      author: "LTMagazine",
      readTime: "10 min read",
    },
  ];
}
