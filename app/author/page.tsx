import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { PencilLine, PlusCircle, FileText } from "lucide-react";

export default async function AuthorPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div className="p-10 text-red-500">Unauthorized</div>;
  }
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      posts: {
        orderBy: { createdAt: "desc" },
        take: 5,
      },
    },
  });

  if (!user) {
    return <div className="p-10 text-red-500">User not found</div>;
  }

  const postCount = await prisma.post.count({
    where: { authorId: user.id },
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 lg:px-32">
      <div className="flex items-center justify-between py-8">
        <div>
          <h1 className="text-3xl font-bold text-yellow-300">Welcome, {user.name || "Author"}</h1>
          <p className="text-slate-400">Here's what's happening with your content.</p>
        </div>

        <Link href="/author/create-post" className="flex items-center gap-2 bg-yellow-300 text-slate-950 px-4 py-2 rounded-lg hover:bg-yellow-400 transition">
          <PlusCircle size={20} /> Create New Post
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-slate-900 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
            <FileText size={20} /> Total Posts
          </h2>
          <p className="text-3xl font-bold text-yellow-300">{postCount}</p>
        </div>

        <div className="bg-slate-900 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <PencilLine size={20} /> Latest Post
          </h2>
          {user.posts.length > 0 ? (
            <div>
              <h3 className="text-xl font-semibold">{user.posts[0].title}</h3>
              <p className="text-slate-400 text-sm">
                {new Date(user.posts[0].createdAt).toLocaleDateString()}
              </p>
            </div>) : (<p className="text-slate-400">You haven't written any posts yet.</p>)}
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-yellow-300 mb-4">Your Recent Posts</h2>
        <ul className="space-y-4">
          {user.posts.length === 0 && (<p className="text-slate-400">No posts yet. Start writing!</p>)}
          {user.posts.map((post) => (<li key={post.id} className="bg-slate-900 p-4 rounded-lg hover:bg-slate-800 transition">
              <Link href={`/blog/${post.slug}`}>
                <div>
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-sm text-slate-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
