import { prisma } from "@/lib/prisma";

export async function TotalUsersCard() {
  const count = await prisma.user.count();

  return (
    <div className="bg-slate-900 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-lg font-bold mb-2 text-amber-400">Total Users</h2>
      <p className="text-3xl font-semibold">{count}</p>
    </div>
  );
}
