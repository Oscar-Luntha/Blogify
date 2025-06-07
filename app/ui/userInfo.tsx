'use client'
import { UserButton, useUser } from "@clerk/nextjs"
export default function UserDisplay(){
    const {user, isLoaded} = useUser()
    if (!isLoaded || !user) return null;

    return(
        <div className="flex md:flex-row-reverse items-center gap-2">
            <UserButton />

             <div className=" flex text-sm text-gray-200 font-medium">
                {user.firstName} { user.lastName}
            </div>
        </div>
    )
}