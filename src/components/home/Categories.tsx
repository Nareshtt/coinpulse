import { getCoinCategories } from "@/lib/coingecko";

export default async function Categories() {
  const categories = await getCoinCategories();

  return (
    <section className="w-full mt-7 space-y-4">
      <h2 className="text-xl font-semibold">Categories</h2>
      <div className="flex flex-wrap gap-3">
        {categories.slice(0, 10).map((cat: any) => (
          <span key={cat.id} className="px-4 py-2 bg-[#16161f] border border-[#2a2a3a] rounded-full">
            {cat.name} ({cat.coin_count})
          </span>
        ))}
      </div>
    </section>
  );
}
