'use client'

import { useUser } from '@clerk/nextjs'

export default function RoleLinks() {
  const { user } = useUser()
  const role = user?.publicMetadata?.role as string

  return (
    <>
      {role === 'admin' && <a href="/admin">Admin Dashboard</a>}
      {role === 'author' && <a href="/author">Author Dashboard</a>}
    </>
  )
}
