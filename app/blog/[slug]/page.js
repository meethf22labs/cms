import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/blog"));
  return files.map((file) => ({
    slug: file.replace(".md", ""),
  }));
}

export default async function BlogPage({ params }) {
  const filePath = path.join(process.cwd(), "content/blog", `${params.slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  return (
    <main style={{ maxWidth: 720, margin: "auto", padding: 20 }}>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <p>{data.description}</p>
      <ReactMarkdown>{content}</ReactMarkdown>
    </main>
  );
}
