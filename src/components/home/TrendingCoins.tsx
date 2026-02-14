"use client";

import Image from "next/image";
import { TrendingCoin } from "@/types";

interface TrendingCoinsProps {
  data: TrendingCoin[];
}

export default function TrendingCoins({ data }: TrendingCoinsProps) {
  return (
    <div id="trending-coins" className="w-full flex flex-col justify-center h-full py-4 bg-dark-600 rounded-xl">
      <h4 className="text-xl md:text-2xl font-semibold mb-2 px-5 text-white">Trending Coins</h4>
      <table className="custom-scrollbar bg-dark-600 overflow-hidden">
        <thead>
          <tr className="bg-dark-500 text-gray-400 py-4">
            <th className="text-left py-4 pl-5 font-medium">Name</th>
            <th className="text-right py-4 pr-5 font-medium">24h Change</th>
            <th className="text-right py-4 pr-5 font-medium">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((coin) => (
            <tr key={coin.item.id} className="border-b border-dark-500 hover:bg-dark-500/50 cursor-pointer">
              <td className="py-4 pl-5 font-bold">
                <a href={`/coins/${coin.item.id}`} className="pl-1 md:pl-2 py-1 md:py-2 xl:py-1 flex items-center gap-2 md:gap-3">
                  <img src={coin.item.large} alt={coin.item.name} className="rounded-full size-8 md:size-9" />
                  <span className="text-sm md:text-base text-white">{coin.item.name}</span>
                </a>
              </td>
              <td className="py-4 pr-5 font-medium text-right text-green-500">+2.5%</td>
              <td className="py-4 pr-5 font-bold text-right text-sm max-w-full truncate text-gray-300">$0.00</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
