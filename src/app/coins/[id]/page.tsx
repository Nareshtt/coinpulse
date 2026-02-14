import Image from "next/image";
import { notFound } from "next/navigation";
import { getMarketCoins, getCoinChartData } from "@/lib/coingecko";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import PriceChart from "@/components/PriceChart";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CoinPage({ params }: PageProps) {
  const { id } = await params;
  
  const coins = await getMarketCoins("usd", 100);
  const coin = coins.find((c: any) => c.id === id);
  
  if (!coin) {
    notFound();
  }

  const chartData = await getCoinChartData(id, 30);
  const isPositive = coin.price_change_percentage_24h >= 0;
  const chartColor = isPositive ? '#00cc6a' : '#ff3366';

  return (
    <main className="main-container">
      <div id="coin-details-page" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-start gap-6">
        <div className="primary">
          <div id="coin-overview" className="w-full h-full xl:col-span-2 px-2 bg-dark-500 rounded-xl">
            <div className="header flex-1 mb-2 flex gap-2 md:gap-3 p-4">
              <Image 
                src={coin.image} 
                alt={coin.name} 
                width={64} 
                height={64} 
                className="w-10 h-10 md:w-14 md:h-14"
              />
              <div className="info flex flex-col">
                <p className="flex text-cyan-100 text-xs md:text-sm w-fit">
                  {coin.name} / {coin.symbol.toUpperCase()}
                </p>
                <h1 className="text-xl md:text-2xl font-semibold">{formatCurrency(coin.current_price)}</h1>
                <span className={isPositive ? "text-green-400" : "text-red-400"}>
                  {formatPercentage(coin.price_change_percentage_24h)} (24h)
                </span>
              </div>
            </div>
            
            <div className="p-2">
              <PriceChart 
                data={chartData} 
                color={chartColor}
                height={320}
              />
            </div>
          </div>
        </div>

        <div className="secondary">
          <div id="converter" className="w-full space-y-5 bg-dark-500 p-5 rounded-xl">
            <h4 className="text-2xl font-semibold">Converter</h4>
            <div className="panel space-y-2 bg-dark-400 px-5 py-7 rounded-lg">
              <input 
                type="number" 
                placeholder="Amount" 
                className="input w-full bg-dark-500 text-lg border-none font-medium p-3 rounded-md"
              />
              <div className="flex items-center gap-2 mt-2">
                <Image src={coin.image} alt={coin.symbol} width={24} height={24} className="rounded-full" />
                <span className="font-semibold text-cyan-100">{coin.symbol.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="divider relative flex justify-center items-center my-4">
              <div className="h-px z-10 w-full bg-dark-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="size-8 z-20 bg-dark-400 rounded-full p-2 text-green-400 flex items-center justify-center">↓</div>
            </div>
            
            <div className="output-wrapper bg-dark-400 h-12 w-full rounded-md flex items-center justify-between py-4 pl-4">
              <p className="text-base font-medium">0.00 USD</p>
              <select className="w-fit border-none cursor-pointer h-12 bg-dark-400 text-cyan-100 text-xs font-semibold px-3 rounded-md">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-dark-500 p-4 rounded-lg">
          <p className="text-cyan-100 text-sm">Market Cap</p>
          <p className="font-semibold text-lg">{formatCurrency(coin.market_cap)}</p>
        </div>
        <div className="bg-dark-500 p-4 rounded-lg">
          <p className="text-cyan-100 text-sm">Volume (24h)</p>
          <p className="font-semibold text-lg">{formatCurrency(coin.total_volume)}</p>
        </div>
        <div className="bg-dark-500 p-4 rounded-lg">
          <p className="text-cyan-100 text-sm">Rank</p>
          <p className="font-semibold text-lg">#{coin.market_cap_rank}</p>
        </div>
        <div className="bg-dark-500 p-4 rounded-lg">
          <p className="text-cyan-100 text-sm">24h Change</p>
          <p className={`font-semibold text-lg ${isPositive ? "text-green-400" : "text-red-400"}`}>
            {formatPercentage(coin.price_change_percentage_24h)}
          </p>
        </div>
      </div>
    </main>
  );
}
