import Image from "next/image";
import DataTable from "@/components/DataTable";
import { getCoinDetails, getTrendingCoins, getCoinCategories } from "@/lib/coingecko";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
  };
}

interface TrendingData {
  coins: Array<{
    item: {
      id: string;
      name: string;
      symbol: string;
      market_cap_rank: number;
      thumb: string;
      large: string;
      price_btc: number;
    };
  }>;
}

interface CategoryData {
  id: string;
  name: string;
  coin_count: number;
}

export default async function Home() {
  let coin: CoinData | null = null;
  let trending: TrendingData | null = null;
  let categories: CategoryData[] = [];

  try {
    coin = await getCoinDetails("bitcoin");
    trending = await getTrendingCoins();
    categories = await getCoinCategories();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  const price = coin?.market_data?.current_price?.usd || 0;
  const change = coin?.market_data?.price_change_percentage_24h || 0;

  const trendingColumns = [
    {
      header: "Name",
      cell: (row: any) => (
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
      cell: () => (
        <span className="text-[#00ff88]">Loading...</span>
      ),
    },
    {
      header: "Price",
      cell: () => <span>Loading...</span>,
    },
  ];

  return (
    <main className="main-container">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
        <div id="coin-overview" className="card-gaming p-6">
          <div className="flex items-center gap-4">
            {coin && (
              <Image
                src={coin.image.large}
                alt={coin.name}
                width={56}
                height={56}
              />
            )}
            <div className="header pt-2">
              <p className="text-lg font-semibold">{coin?.name || "Bitcoin"} {coin?.symbol?.toUpperCase() || "BTC"}</p>
              <h1 className="text-2xl font-bold">${price.toLocaleString()}</h1>
              <span className={change >= 0 ? "text-[#00ff88]" : "text-[#ff3366]"}>
                {change >= 0 ? "+" : ""}{change.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <div id="trending-coins" className="card-gaming p-6">
          <h2 className="text-xl font-semibold mb-4">Trending Coins</h2>
          {trending && (
            <DataTable
              columns={trendingColumns}
              data={trending.coins.slice(0, 5)}
              rowKey={(row) => row.item.id}
            />
          )}
        </div>
      </section>

      <section className="w-full mt-7 space-y-4">
        <h2 className="text-xl font-semibold">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.slice(0, 10).map((cat) => (
            <span key={cat.id} className="px-4 py-2 bg-[#16161f] border border-[#2a2a3a] rounded-full">
              {cat.name} ({cat.coin_count})
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}
