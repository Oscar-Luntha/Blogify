import { SignedOut, SignedIn} from "@clerk/nextjs";
import NavLinks from "./navLinks"
import Link from "next/link";
import UserDisplay from "../userInfo";
export default function NavBar(){
    return(
        <nav className="flex flex-col-reverse md:flex md:flex-row gap-6">
            <div className="flex flex-col md:flex-row flex-wrap md:items-center gap-3 md:gap-6 text-base md:text-lg text-gray-100 font-medium">
              <NavLinks/>
            </div>
            <SignedOut>
            <Link href='/login' className="md:bg-slate-700 md:text-white md:px-6 md:py-1.5 rounded hover:bg-gray-800 md:transition">
            Signin
            </Link>
        </SignedOut>               
        <SignedIn>
          <div className="flex">
            <div>
              <UserDisplay />
            </div>
          </div>  
        </SignedIn>
        </nav>
    )
}