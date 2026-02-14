"use client";

import Image from "next/image";
import DataTable from "@/components/DataTable";
import { TrendingCoin } from "@/types";

const dummyTrendingCoins: TrendingCoin[] = [
  {
    item: {
      id: "bitcoin",
      name: "Bitcoin",
      symbol: "BTC",
      market_cap_rank: 1,
      thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png",
      large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
      slug: "bitcoin",
      price_btc: 1,
      score: 0,
    },
  },
  {
    item: {
      id: "ethereum",
      name: "Ethereum",
      symbol: "ETH",
      market_cap_rank: 2,
      thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png",
      large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
      slug: "ethereum",
      price_btc: 0.05,
      score: 1,
    },
  },
];

const columns = [
  {
    header: "Name",
    cell: (row: TrendingCoin) => (
      <div className="flex items-center gap-2">
        <Image
          src={row.item.large}
          alt={row.item.name}
          width={36}
          height={36}
        />
        <span>{row.item.name}</span>
      </div>
    ),
  },
  {
    header: "24h Change",
    cell: (row: TrendingCoin) => (
      <span className="text-[#00ff88]">+2.5%</span>
    ),
  },
  {
    header: "Price",
    cell: () => <span>$89,000</span>,
  },
];

export default function Home() {
  return (
    <main className="main-container">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
        <div id="coin-overview" className="card-gaming p-6">
          <div className="flex items-center gap-4">
            <Image
              src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
              alt="Bitcoin"
              width={56}
              height={56}
            />
            <div className="header pt-2">
              <p className="text-lg font-semibold">Bitcoin BTC</p>
              <h1 className="text-2xl font-bold">$89,234</h1>
            </div>
          </div>
        </div>

        <div id="trending-coins" className="card-gaming p-6">
          <h2 className="text-xl font-semibold mb-4">Trending Coins</h2>
          <DataTable
            columns={columns}
            data={dummyTrendingCoins}
            rowKey={(row) => row.item.id}
          />
        </div>
      </section>

      <section className="w-full mt-7 space-y-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 bg-[#16161f] border border-[#2a2a3a] rounded-full">DeFi</span>
          <span className="px-4 py-2 bg-[#16161f] border border-[#2a2a3a] rounded-full">Metaverse</span>
          <span className="px-4 py-2 bg-[#16161f] border border-[#2a2a3a] rounded-full">Gaming</span>
        </div>
      </section>
    </main>
  );
}
