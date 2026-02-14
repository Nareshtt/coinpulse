"use client";

import Image from "next/image";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

interface CoinsTableProps {
  coins: Coin[];
}

export default function CoinsTable({ coins }: CoinsTableProps) {
  return (
    <div className="coins-table bg-dark-500 rounded-xl max-h-fit overflow-hidden">
      <table className="custom-scrollbar w-full">
        <thead>
          <tr className="bg-dark-400 text-cyan-400">
            <th className="text-left py-4 pl-5 font-medium max-w-20">#</th>
            <th className="text-left py-4 font-medium">Name</th>
            <th className="text-right py-4 font-medium">Price</th>
            <th className="text-right py-4 font-medium">24h Change</th>
            <th className="text-right py-4 pr-5 font-medium">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={coin.id} className="border-b border-dark-400 hover:bg-dark-400/30">
              <td className="py-5 pl-5 font-medium text-cyan-100">{index + 1}</td>
              <td className="py-3 font-semibold">
                <a href={`/coins/${coin.id}`} className="flex items-center gap-3">
                  <Image
                    src={coin.image}
                    alt={coin.name}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span>{coin.name}</span>
                  <span className="text-gray-400 text-sm uppercase">{coin.symbol}</span>
                </a>
              </td>
              <td className="py-4 text-right font-medium">{formatCurrency(coin.current_price)}</td>
              <td className={`py-4 text-right font-medium ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {formatPercentage(coin.price_change_percentage_24h)}
              </td>
              <td className="py-4 pr-5 text-right font-medium">{formatCurrency(coin.market_cap)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
