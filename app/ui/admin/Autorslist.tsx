import { prisma } from "@/lib/prisma";

export async function AuthorsPostList() {
  const authors = await prisma.user.findMany({
    where: {
      role: "AUTHOR",
    },
    include: {
      posts: true,
    },
  });

  return (
    <div className="bg-slate-900 p-6 rounded-lg shadow-md text-white mt-8">
      <h2 className="text-lg font-bold mb-4 text-yellow-300">Authors & Their Posts</h2>
      <ul className="space-y-4">
        {authors.map((author) => (
          <li
            key={author.id}
            className="border border-slate-700 rounded p-4 flex justify-between items-center"
          >
            <div>
              <p className="text-white font-medium">{author.name || "Unnamed Author"}</p>
              <p className="text-sm text-slate-400">{author.email || "No Email"}</p>
            </div>
            <p className="text-amber-400 font-semibold">
              Posts: {author.posts.length}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
