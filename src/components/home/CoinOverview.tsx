"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
    price_change_percentage_7d_in_currency?: { usd: number };
    price_change_24h_in_currency?: { usd: number };
  };
}

interface CoinOverviewProps {
  coin?: Coin;
}

export default function CoinOverview({ coin }: CoinOverviewProps) {
  const price = coin?.market_data?.current_price?.usd || 89234;
  const change = coin?.market_data?.price_change_percentage_24h || 2.45;

  return (
    <div id="coin-overview" className="w-full h-full xl:col-span-2 px-2 bg-dark-500 rounded-xl">
      <div className="header flex-1 mb-2 flex gap-2 md:gap-3 pt-4">
        <Image 
          src={coin?.image?.large || "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"} 
          alt={coin?.name || "Bitcoin"} 
          width={56} 
          height={56} 
          className="w-10 h-10 md:w-14 md:h-14"
        />
        <div className="info flex flex-col">
          <p className="flex text-cyan-100 text-xs md:text-sm w-fit">
            {coin?.name || "Bitcoin"} / {(coin?.symbol || "btc").toUpperCase()}
          </p>
          <h1 className="text-xl md:text-2xl font-semibold">{formatCurrency(price)}</h1>
        </div>
      </div>
      
      <div className="h-64 bg-dark-400 rounded-lg flex items-center justify-center m-2">
        <div className="text-center">
          <p className="text-gray-400">Price Chart</p>
          <p className="text-sm text-cyan-400 mt-2">Interactive chart coming soon</p>
        </div>
      </div>
    </div>
  );
}
