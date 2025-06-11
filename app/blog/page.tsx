import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="w-full min-h-[50vh] bg-slate-900 lg:px-60 py-16 text-center">
        <h1 className="text-4xl text-yellow-300 md:text-6xl font-bold mb-4">
          All Blogs
        </h1>
        <p className="text-base lg:text-xl text-white mb-6">
          Discover what others are writing about insights, stories, and more.
        </p>
      </section>

      <section className="w-full py-16 px-6 md:px-16 lg:px-60">
        <ul className="space-y-10">
          {posts.map((post) => (
            <li key={post.id} className="bg-slate-800 p-6 rounded-lg shadow-md hover:bg-slate-700 transition">
              <Link href={`/blog/${post.slug}`}>
                <div>
                  <h2 className="text-2xl font-bold text-yellow-300 mb-2">{post.title}</h2>
                  <p className="text-white text-base mb-4 line-clamp-3">{post.content}</p>
                  <div className="text-sm text-slate-400 flex justify-between items-center">
                    <span>By {post.author?.name || "Unknown Author"}</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
