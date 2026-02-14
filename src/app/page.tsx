import { Suspense } from "react";
import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoins from "@/components/home/TrendingCoins";
import Categories from "@/components/home/Categories";
import { getTrendingCoins } from "@/lib/coingecko";

function LoadingCard() {
  return <div className="card-gaming p-6 animate-pulse">Loading...</div>;
}

async function TrendingCoinsWrapper() {
  const trending = await getTrendingCoins();
  return <TrendingCoins data={trending.coins} />;
}

export default function Home() {
  return (
    <main className="main-container">
      <section className="home-grid gap-6 mb-7">
        <Suspense fallback={<LoadingCard />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<LoadingCard />}>
          <TrendingCoinsWrapper />
        </Suspense>
      </section>

      <Suspense fallback={<div className="mt-7">Loading categories...</div>}>
        <Categories />
      </Suspense>
    </main>
  );
}
