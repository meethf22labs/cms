import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home() {
  const files = fs.readdirSync(path.join(process.cwd(), "content/blog"));
  const posts = files.map((file) => {
    const fileContent = fs.readFileSync(path.join("content/blog", file), "utf-8");
    const { data } = matter(fileContent);
    return {
      slug: file.replace(".md", ""),
      title: data.title,
      date: data.date,
    };
  });

  return (
    <main style={{ maxWidth: 720, margin: "auto", padding: 20 }}>
      <h1>My Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link> ({post.date})
          </li>
        ))}
      </ul>
    </main>
  );
}
