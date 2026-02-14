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
  const chartColor = isPositive ? '#22c55e' : '#ef4444';

  return (
    <main className="main-container">
      <div id="coin-details-page" className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-start gap-6">
        <div className="primary">
          <div id="coin-overview" className="w-full h-full xl:col-span-2 px-2 bg-white rounded-xl border border-gray-200">
            <div className="header flex-1 mb-2 flex gap-2 md:gap-3 p-4">
              <Image 
                src={coin.image} 
                alt={coin.name} 
                width={64} 
                height={64} 
                className="w-10 h-10 md:w-14 md:h-14"
              />
              <div className="info flex flex-col">
                <p className="flex text-slate-500 text-xs md:text-sm w-fit">
                  {coin.name} / {coin.symbol.toUpperCase()}
                </p>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900">{formatCurrency(coin.current_price)}</h1>
                <span className={isPositive ? "text-green-600" : "text-red-600"}>
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
          <div id="converter" className="w-full space-y-5 bg-white p-5 rounded-xl border border-gray-200">
            <h4 className="text-2xl font-semibold text-gray-900">Converter</h4>
            <div className="panel space-y-2 bg-gray-50 px-5 py-7 rounded-lg border border-gray-100">
              <input 
                type="number" 
                placeholder="Amount" 
                className="input w-full bg-gray-100 text-lg border-none font-medium p-3 rounded-md text-gray-900"
              />
              <div className="flex items-center gap-2 mt-2">
                <Image src={coin.image} alt={coin.symbol} width={24} height={24} className="rounded-full" />
                <span className="font-semibold text-purple-600">{coin.symbol.toUpperCase()}</span>
              </div>
            </div>
            
            <div className="divider relative flex justify-center items-center my-4">
              <div className="h-px z-10 w-full bg-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              <div className="size-8 z-20 bg-white rounded-full p-2 text-purple-600 flex items-center justify-center border border-gray-200">↓</div>
            </div>
            
            <div className="output-wrapper bg-gray-100 h-12 w-full rounded-md flex items-center justify-between py-4 pl-4">
              <p className="text-base font-medium text-gray-700">0.00 USD</p>
              <select className="w-fit border-none cursor-pointer h-12 bg-gray-100 text-slate-600 text-xs font-semibold px-3 rounded-md">
                <option>USD</option>
                <option>EUR</option>
                <option>GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-slate-500 text-sm">Market Cap</p>
          <p className="font-semibold text-lg text-gray-900">{formatCurrency(coin.market_cap)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-slate-500 text-sm">Volume (24h)</p>
          <p className="font-semibold text-lg text-gray-900">{formatCurrency(coin.total_volume)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-slate-500 text-sm">Rank</p>
          <p className="font-semibold text-lg text-gray-900">#{coin.market_cap_rank}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-slate-500 text-sm">24h Change</p>
          <p className={`font-semibold text-lg ${isPositive ? "text-green-600" : "text-red-600"}`}>
            {formatPercentage(coin.price_change_percentage_24h)}
          </p>
        </div>
      </div>
    </main>
  );
}
