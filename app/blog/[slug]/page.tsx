import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
    const slug = await Promise.resolve(params.slug);
  const post = await prisma.post.findUnique({
    where: { slug},
    include: { author: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16 lg:px-60">
      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-yellow-300 mb-6">
          {post.title}
        </h1>
        <div className="text-sm text-slate-400 mb-8">
          <span>By {post.author?.name || "Unknown Author"}</span> ·{" "}
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        <div
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
