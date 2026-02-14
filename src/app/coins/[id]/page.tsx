import Image from "next/image";
import { notFound } from "next/navigation";
import { getCoinDetails, getMarketCoins } from "@/lib/coingecko";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CoinPage({ params }: PageProps) {
  const { id } = await params;
  
  const coins = await getMarketCoins("usd", 100);
  const coin = coins.find((c: any) => c.id === id) || notFound();

  return (
    <main className="main-container">
      <div className="card-gaming p-6 mb-6">
        <div className="flex items-center gap-4">
          <Image
            src={coin.image}
            alt={coin.name}
            width={64}
            height={64}
          />
          <div>
            <h1 className="text-3xl font-bold">{coin.name}</h1>
            <p className="text-gray-400">{coin.symbol.toUpperCase()} • Rank #{coin.market_cap_rank}</p>
          </div>
        </div>
        
        <div className="mt-6">
          <p className="text-4xl font-bold">{formatCurrency(coin.current_price)}</p>
          <p className={coin.price_change_percentage_24h >= 0 ? "text-[#00ff88] text-xl" : "text-[#ff3366] text-xl"}>
            {formatPercentage(coin.price_change_percentage_24h)} (24h)
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-[#12121a] p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Market Cap</p>
            <p className="font-semibold">{formatCurrency(coin.market_cap)}</p>
          </div>
          <div className="bg-[#12121a] p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Volume (24h)</p>
            <p className="font-semibold">{formatCurrency(coin.total_volume)}</p>
          </div>
          <div className="bg-[#12121a] p-4 rounded-lg">
            <p className="text-gray-400 text-sm">24h High</p>
            <p className="font-semibold">{formatCurrency(coin.high_24h)}</p>
          </div>
          <div className="bg-[#12121a] p-4 rounded-lg">
            <p className="text-gray-400 text-sm">24h Low</p>
            <p className="font-semibold">{formatCurrency(coin.low_24h)}</p>
          </div>
        </div>
      </div>
      
      <div className="card-gaming p-6">
        <h2 className="text-xl font-semibold mb-4">Price Chart</h2>
        <div className="h-64 bg-[#12121a] rounded-lg flex items-center justify-center">
          <p className="text-gray-400">Chart coming soon...</p>
        </div>
      </div>
    </main>
  );
}
