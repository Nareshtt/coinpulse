"use client";

import Image from "next/image";
import { TrendingCoin } from "@/types";

interface TrendingCoinsProps {
  data: TrendingCoin[];
}

export default function TrendingCoins({ data }: TrendingCoinsProps) {
  return (
    <div id="trending-coins" className="w-full flex flex-col justify-center h-full py-4 bg-white rounded-xl border border-gray-200">
      <h4 className="text-xl md:text-2xl font-semibold mb-2 px-5 text-gray-900">Trending Coins</h4>
      <table className="custom-scrollbar bg-white overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-purple-600 py-4">
            <th className="text-left py-4 pl-5 font-medium">Name</th>
            <th className="text-right py-4 pr-5 font-medium">24h Change</th>
            <th className="text-right py-4 pr-5 font-medium">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 5).map((coin) => (
            <tr key={coin.item.id} className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer">
              <td className="py-4 pl-5 font-bold">
                <a href={`/coins/${coin.item.id}`} className="pl-1 md:pl-2 py-1 md:py-2 xl:py-1 flex items-center gap-2 md:gap-3">
                  <img src={coin.item.large} alt={coin.item.name} className="rounded-full size-8 md:size-9" />
                  <span className="text-sm md:text-base text-gray-900">{coin.item.name}</span>
                </a>
              </td>
              <td className="py-4 pr-5 font-medium text-right text-green-600">+2.5%</td>
              <td className="py-4 pr-5 font-bold text-right text-sm max-w-full truncate text-gray-700">$0.00</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
