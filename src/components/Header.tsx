"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const mockCoins = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", image: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png", price: 89234, change: 2.45 },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", image: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png", price: 2345, change: 3.21 },
  { id: "solana", name: "Solana", symbol: "SOL", image: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png", price: 145, change: 5.67 },
  { id: "cardano", name: "Cardano", symbol: "ADA", image: "https://assets.coingecko.com/coins/images/975/thumb/cardano.png", price: 0.89, change: -1.23 },
  { id: "ripple", name: "XRP", symbol: "XRP", image: "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png", price: 2.15, change: 1.89 },
];

export default function Header() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredCoins = mockCoins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <header className="bg-gray-50">
        <div className="main-container inner">
          <Link href="/">
            <Image src="/logo.svg" alt="CoinPulse logo" width={140} height={40} />
          </Link>

          <nav>
            <Link
              href="/"
              className={cn("nav-link", {
                "is-active": pathname === "/",
                "is-home": true,
              })}
            >
              Home
            </Link>

            <div 
              className="nav-link cursor-pointer flex items-center gap-2" 
              onClick={() => setIsSearchOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.3-4.3"/>
              </svg>
              Search
              <span className="kbd ml-2">
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-slate-500">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </span>
            </div>

            <Link
              href="/coins"
              className={cn("nav-link", {
                "is-active": pathname === "/coins",
              })}
            >
              All Coins
            </Link>
          </nav>
        </div>
      </header>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/30" onClick={() => setIsSearchOpen(false)}>
          <div className="dialog w-full max-w-2xl mx-4 bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="cmd-input p-4 border-b border-gray-100">
              <input
                type="text"
                placeholder="Search coins..."
                className="w-full bg-transparent text-gray-900 placeholder:text-slate-400 outline-none text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
            <div className="list max-h-96 overflow-y-auto">
              {filteredCoins.length === 0 ? (
                <div className="empty py-6 text-center text-sm text-slate-400">
                  No results found
                </div>
              ) : (
                filteredCoins.map((coin) => (
                  <Link
                    key={coin.id}
                    href={`/coins/${coin.id}`}
                    className="search-item grid grid-cols-4 gap-4 items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <div className="coin-info flex gap-4 items-center col-span-2">
                      <img src={coin.image} alt={coin.name} className="size-9 rounded-full" />
                      <div>
                        <p className="font-semibold text-gray-900">{coin.name}</p>
                        <p className="coin-symbol text-sm text-slate-500 uppercase">{coin.symbol}</p>
                      </div>
                    </div>
                    <div className="coin-price text-right font-semibold text-gray-700">
                      ${coin.price.toLocaleString()}
                    </div>
                    <div className={`coin-change text-right font-medium ${coin.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {coin.change >= 0 ? "+" : ""}{coin.change}%
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
