import Link from "next/link";

interface Category {
  id: string;
  name: string;
  coin_count: number;
}

interface CategoriesProps {
  categories?: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  const defaultCategories = [
    { id: "defi", name: "DeFi", coin_count: 1200 },
    { id: "metaverse", name: "Metaverse", coin_count: 850 },
    { id: "gaming", name: "Gaming", coin_count: 620 },
    { id: "stablecoin", name: "Stablecoin", coin_count: 180 },
    { id: "layer-1", name: "Layer 1", coin_count: 450 },
  ];

  const displayCategories = categories || defaultCategories;

  return (
    <div id="categories" className="pt-8 mt-5 w-full bg-dark-500 rounded-xl overflow-hidden">
      <h4 className="text-xl md:text-2xl font-semibold mb-2 pl-5">Categories</h4>
      <table className="w-full">
        <thead>
          <tr className="bg-dark-400 text-cyan-400">
            <th className="text-left py-4 pl-5 font-medium">Category</th>
            <th className="text-right py-4 font-medium">Coins</th>
            <th className="text-right py-4 pr-5 font-medium">24h Change</th>
          </tr>
        </thead>
        <tbody>
          {displayCategories.slice(0, 8).map((category) => (
            <tr key={category.id} className="border-b border-dark-400 hover:bg-dark-400/30 cursor-pointer">
              <td className="py-4 pl-5 font-bold">{category.name}</td>
              <td className="py-4 text-right font-medium">{category.coin_count}</td>
              <td className="py-4 pr-5 text-right font-medium text-green-400">+2.5%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
