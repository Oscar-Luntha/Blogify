import { prisma } from "@/lib/prisma";

export async function TotalAuthorsCard() {
  const count = await prisma.user.count({
    where: {
      role: "AUTHOR",
    },
  });

  return (
    <div className="bg-slate-900 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-lg font-bold mb-2 text-blue-400">Total Authors</h2>
      <p className="text-3xl font-semibold">{count}</p>
    </div>
  );
}
