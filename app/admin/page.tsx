import { redirect } from 'next/navigation'
import { checkRole } from '@/utils/roles'
import { SearchUsers } from '../ui/admin/SearchUsers'
import { clerkClient } from '@clerk/nextjs/server'
import { removeRole, setRole } from '@/action/action'
import { TotalUsersCard } from '../ui/admin/TotalUsers'
import { TotalAuthorsCard } from '../ui/admin/TotalAuthors'


export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>
}) {
  if (!checkRole('admin')) {
    redirect('/')
  }

  const query = (await params.searchParams).search
  const client = await clerkClient()
  const users = query ? (await client.users.getUserList({ query })).data : []

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
        <div className="flex max-w-5xl mx-auto gap-6 mb-12">
        <TotalUsersCard />
        <TotalAuthorsCard />
    </div>
      <section className="bg-slate-900 rounded-xl p-8 max-w-5xl mx-auto shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-500 mb-6 text-center">
          Admin Dashboard
        </h1>
        <p className="text-center text-gray-300 mb-10">
          This area is restricted to users with the <code className="text-amber-400">admin</code> role.
        </p>

        <div className="mb-8">
          <SearchUsers />
        </div>

        {users.length > 0 ? (
          <div className="space-y-6">
            {users.map((user) => {
              const email = user.emailAddresses.find(
                (email) => email.id === user.primaryEmailAddressId
              )?.emailAddress

              return (
                <div key={user.id} className="bg-slate-800 rounded-lg p-6 shadow border border-slate-700">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {user.firstName} {user.lastName}
                      </h2>
                      <p className="text-gray-400 text-sm">{email}</p>
                      <p className="mt-1 text-sm text-amber-400 font-medium">
                        Role: {user.publicMetadata.role as string || 'none'}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <form action={setRole}>
                        <input type="hidden" name="id" value={user.id} />
                        <input type="hidden" name="role" value="admin" />
                        <button type="submit" className="bg-amber-500 text-slate-900 font-medium px-4 py-2 rounded hover:bg-amber-600 transition">
                          Make Admin
                        </button>
                      </form>
                      <form action={setRole}>
                        <input type="hidden" name="id" value={user.id} />
                        <input type="hidden" name="role" value="author" />
                        <button type="submit" className="bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 transition">
                          Make Athuor
                        </button>
                      </form>
                      <form action={removeRole}>
                        <input type="hidden" name="id" value={user.id} />
                        <button type="submit" className="bg-red-900 text-white font-medium px-4 py-2 rounded hover:bg-red-800 transition">
                          Remove Role
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>) : ( <p className="text-center text-gray-400">No users found.</p> )}
      </section>
      
    </div>
  )
}
