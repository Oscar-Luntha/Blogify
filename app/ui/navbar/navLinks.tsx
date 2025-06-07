import Link from "next/link";
const links = [
    {name : 'Blog',href:'/blog'},
    {name : 'About', href:'/about'},
    {name : 'Contact', href: '/contact'}
]
export default function NavLinks(){
    return(
        links.map((link)=><Link key={link.name} href={link.href}>{link.name}</Link>)
    )
}