"use client";

import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import PriceChart from "@/components/PriceChart";

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
  chartData?: { time: string; value: number }[];
}

function generateMockChartData(basePrice: number, days: number = 30): { time: string; value: number }[] {
  const data: { time: string; value: number }[] = [];
  const now = new Date();
  let price = basePrice * 0.85;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const change = (Math.random() - 0.45) * basePrice * 0.03;
    price = Math.max(price + change, basePrice * 0.5);
    price = Math.min(price, basePrice * 1.2);
    
    data.push({
      time: date.toISOString().split('T')[0],
      value: price
    });
  }
  
  data[data.length - 1].value = basePrice;
  return data;
}

export default function CoinOverview({ coin, chartData }: CoinOverviewProps) {
  const price = coin?.market_data?.current_price?.usd || 89234;
  const change = coin?.market_data?.price_change_percentage_24h || 2.45;
  const isPositive = change >= 0;
  
  const data = chartData || generateMockChartData(price, 30);
  const chartColor = isPositive ? '#00cc6a' : '#ff3366';

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
          <span className={isPositive ? "text-green-400 text-sm" : "text-red-400 text-sm"}>
            {isPositive ? "+" : ""}{change.toFixed(2)}% (24h)
          </span>
        </div>
      </div>
      
      <div className="p-2">
        <PriceChart 
          data={data} 
          color={chartColor}
          height={260}
        />
      </div>
    </div>
  );
}
