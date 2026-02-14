"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="main-container inner">
      <Link href="/" className="flex items-center">
        <img 
          src="/logo.svg" 
          alt="CoinPulse Logo" 
          width={132} 
          height={40}
        />
      </Link>
      
      <nav className="hidden md:flex gap-6">
        <Link 
          href="/"
          className={cn(
            "nav-link",
            pathname === "/" && "is-active is-home"
          )}
        >
          Home
        </Link>
        <p className="nav-link cursor-pointer">Search Modal</p>
        <Link 
          href="/coins"
          className={cn(
            "nav-link",
            pathname === "/coins" && "is-active"
          )}
        >
          All Coins
        </Link>
      </nav>
    </header>
  );
}
