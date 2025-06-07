'use client'
import { useState } from "react"
import Link from "next/link"
import NavBar from "./navbar/navBar"
import { BookOpenText , Menu} from "lucide-react"

export default function Header(){
    const [openMenu, setOpenMenu] = useState(false)
    function handleMenuClick(){
        setOpenMenu(!openMenu)
    }
    return(
        <header className="p-8 flex flex-col md:flex-row w-full backdrop-blur-md md:p-6 gap-10 justify-between sticky top-0 z-50 shadow ">
            <div className="flex justify-between">
            <Link href="/">
            <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
                    <BookOpenText className="w-8 h-8 p-1 bg-amber-400 text-gray-950 rounded-sm" />
                    <h1 className="text-white">Blogify</h1>
                </div>
            </Link>
            <button onClick={handleMenuClick} className="flex md:hidden">
                    <Menu/>
                </button>
            </div>
            
            <div className={`${openMenu ? "block" : "hidden"} md:flex`}>
                <NavBar/>
            </div>
        </header>
    )
}
