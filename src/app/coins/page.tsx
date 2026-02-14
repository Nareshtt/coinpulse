import CoinsTable from "@/components/CoinsTable";
import { getMarketCoins } from "@/lib/coingecko";

export default async function CoinsPage() {
  const coins = await getMarketCoins("usd", 10);

  return (
    <main className="main-container">
      <h1 className="text-2xl font-bold mb-6">All Coins</h1>
      <CoinsTable coins={coins} />
    </main>
  );
}
