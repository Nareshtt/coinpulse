import Image from "next/image";
import { getCoinDetails } from "@/lib/coingecko";
import { formatCurrency, formatPercentage } from "@/lib/utils";

export default async function CoinOverview() {
  const coin = await getCoinDetails("bitcoin");
  const price = coin?.market_data?.current_price?.usd || 0;
  const change = coin?.market_data?.price_change_percentage_24h || 0;

  return (
    <div id="coin-overview" className="card-gaming p-6">
      <div className="flex items-center gap-4">
        <Image
          src={coin.image.large}
          alt={coin.name}
          width={56}
          height={56}
        />
        <div className="header pt-2">
          <p className="text-lg font-semibold">{coin.name} {coin.symbol.toUpperCase()}</p>
          <h1 className="text-2xl font-bold">{formatCurrency(price)}</h1>
          <span className={change >= 0 ? "text-[#00ff88]" : "text-[#ff3366]"}>
            {formatPercentage(change)}
          </span>
        </div>
      </div>
    </div>
  );
}
