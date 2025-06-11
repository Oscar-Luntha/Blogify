'use client'

import { usePathname, useRouter } from 'next/navigation'

export const SearchUsers = () => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.currentTarget
          const formData = new FormData(form)
          const queryTerm = formData.get('search') as string
          router.push(pathname + '?search=' + queryTerm)
        }}
      >
        <input id="search" name="search" type="text" placeholder="Search users..." className="w-full max-w-md px-4 py-2 rounded-lg bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
        <button type="submit" className='mt-3 md:ml-5 bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600 transition'>Submit</button>
      </form>
    </div>
  )
}