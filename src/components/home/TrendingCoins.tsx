import Image from "next/image";
import DataTable from "@/components/DataTable";
import { getTrendingCoins } from "@/lib/coingecko";

export default async function TrendingCoins() {
  const trending = await getTrendingCoins();

  const columns = [
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
      cell: () => <span className="text-[#00ff88]">Loading...</span>,
    },
    {
      header: "Price",
      cell: () => <span>Loading...</span>,
    },
  ];

  return (
    <div id="trending-coins" className="card-gaming p-6">
      <h2 className="text-xl font-semibold mb-4">Trending Coins</h2>
      <DataTable
        columns={columns}
        data={trending.coins.slice(0, 5)}
        rowKey={(row) => row.item.id}
      />
    </div>
  );
}
