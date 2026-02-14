import { Suspense } from "react";
import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoins from "@/components/home/TrendingCoins";
import Categories from "@/components/home/Categories";

function LoadingCard() {
  return <div className="card-gaming p-6 animate-pulse">Loading...</div>;
}

export default function Home() {
  return (
    <main className="main-container">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">
        <Suspense fallback={<LoadingCard />}>
          <CoinOverview />
        </Suspense>
        <Suspense fallback={<LoadingCard />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <Suspense fallback={<div className="mt-7">Loading categories...</div>}>
        <Categories />
      </Suspense>
    </main>
  );
}
