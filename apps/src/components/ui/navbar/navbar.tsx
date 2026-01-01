import logo from "@/public/logo.png"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Navbar(){


  return(
    <>
  <Image id="navbar-logo" src={logo} alt="logo" className="absolute top-16 left-16 w-20 h-26 opacity-20 z-50"/>
    </>
  )
}
