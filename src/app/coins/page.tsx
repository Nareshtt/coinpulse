import Image from "next/image";
import DataTable from "@/components/DataTable";
import { getMarketCoins } from "@/lib/coingecko";
import { formatCurrency, formatPercentage } from "@/lib/utils";

export default async function CoinsPage() {
  const coins = await getMarketCoins("usd", 10);

  const columns = [
    {
      header: "#",
      cell: (_: any, index: number) => <span>{index + 1}</span>,
    },
    {
      header: "Name",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <Image
            src={row.image}
            alt={row.name}
            width={24}
            height={24}
          />
          <span className="font-medium">{row.name}</span>
          <span className="text-gray-400 text-sm">{row.symbol.toUpperCase()}</span>
        </div>
      ),
    },
    {
      header: "Price",
      cell: (row: any) => <span>{formatCurrency(row.current_price)}</span>,
    },
    {
      header: "24h Change",
      cell: (row: any) => (
        <span className={row.price_change_percentage_24h >= 0 ? "text-[#00ff88]" : "text-[#ff3366]"}>
          {formatPercentage(row.price_change_percentage_24h)}
        </span>
      ),
    },
    {
      header: "Market Cap",
      cell: (row: any) => <span>{formatCurrency(row.market_cap)}</span>,
    },
  ];

  return (
    <main className="main-container">
      <h1 className="text-2xl font-bold mb-6">All Coins</h1>
      <div className="card-gaming">
        <DataTable
          columns={columns}
          data={coins}
          rowKey={(row) => row.id}
        />
      </div>
    </main>
  );
}
