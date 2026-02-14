import { Suspense } from "react";
import CoinOverview from "@/components/home/CoinOverview";
import TrendingCoins from "@/components/home/TrendingCoins";
import Categories from "@/components/home/Categories";
import { getTrendingCoins, getCoinCategories } from "@/lib/coingecko";

function LoadingCard() {
  return (
    <div className="w-full h-full xl:col-span-2 px-2 bg-dark-500 rounded-xl animate-pulse">
      <div className="header flex-1 mb-2 flex gap-2 md:gap-3 p-4">
        <div className="w-10 h-10 md:w-14 md:h-14 bg-dark-400 rounded-full"></div>
        <div className="info flex flex-col gap-2">
          <div className="h-3 w-24 bg-dark-400 rounded"></div>
          <div className="h-7 w-36 bg-dark-400 rounded"></div>
        </div>
      </div>
      <div className="h-64 bg-dark-400 rounded-lg m-2"></div>
    </div>
  );
}

async function TrendingCoinsWrapper() {
  const trending = await getTrendingCoins();
  return <TrendingCoins data={trending.coins} />;
}

async function CategoriesWrapper() {
  const categories = await getCoinCategories();
  return <Categories categories={categories} />;
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

      <Suspense fallback={<div className="pt-8 mt-5 w-full bg-dark-500 rounded-xl p-8">Loading categories...</div>}>
        <CategoriesWrapper />
      </Suspense>
    </main>
  );
}
