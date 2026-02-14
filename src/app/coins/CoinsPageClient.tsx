"use client";

import { useState } from "react";
import CoinsTable from "@/components/CoinsTable";
import CoinsPagination from "@/components/CoinsPagination";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  total_volume: number;
}

interface CoinsPageClientProps {
  initialCoins: Coin[];
}

const mockAllCoins: Coin[] = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", image: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png", current_price: 89234, market_cap: 1700000000000, market_cap_rank: 1, price_change_percentage_24h: 2.45, total_volume: 45000000000 },
  { id: "ethereum", symbol: "eth", name: "Ethereum", image: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png", current_price: 2345, market_cap: 280000000000, market_cap_rank: 2, price_change_percentage_24h: 3.21, total_volume: 15000000000 },
  { id: "solana", symbol: "sol", name: "Solana", image: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png", current_price: 145, market_cap: 65000000000, market_cap_rank: 3, price_change_percentage_24h: 5.67, total_volume: 3500000000 },
  { id: "cardano", symbol: "ada", name: "Cardano", image: "https://assets.coingecko.com/coins/images/975/thumb/cardano.png", current_price: 0.89, market_cap: 31000000000, market_cap_rank: 4, price_change_percentage_24h: -1.23, total_volume: 800000000 },
  { id: "ripple", symbol: "xrp", name: "XRP", image: "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png", current_price: 2.15, market_cap: 95000000000, market_cap_rank: 5, price_change_percentage_24h: 1.89, total_volume: 5000000000 },
  { id: "dogecoin", symbol: "doge", name: "Dogecoin", image: "https://assets.coingecko.com/coins/images/5/thumb/dogecoin.png", current_price: 0.32, market_cap: 45000000000, market_cap_rank: 6, price_change_percentage_24h: 4.5, total_volume: 2000000000 },
  { id: "polkadot", symbol: "dot", name: "Polkadot", image: "https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png", current_price: 7.2, market_cap: 10000000000, market_cap_rank: 7, price_change_percentage_24h: -2.1, total_volume: 400000000 },
  { id: "avalanche", symbol: "avax", name: "Avalanche", image: "https://assets.coingecko.com/coins/images/12559/thumb/Avalanche_Circle_RedWhite_Trans.png", current_price: 35, market_cap: 13000000000, market_cap_rank: 8, price_change_percentage_24h: 6.8, total_volume: 800000000 },
  { id: "chainlink", symbol: "link", name: "Chainlink", image: "https://assets.coingecko.com/coins/images/877/thumb/chainlink-new-logo.png", current_price: 18.5, market_cap: 11000000000, market_cap_rank: 9, price_change_percentage_24h: 2.3, total_volume: 600000000 },
  { id: "polygon", symbol: "matic", name: "Polygon", image: "https://assets.coingecko.com/coins/images/4713/thumb/matic-token-icon.png", current_price: 0.95, market_cap: 9000000000, market_cap_rank: 10, price_change_percentage_24h: -0.5, total_volume: 500000000 },
];

export default function CoinsPageClient({ initialCoins }: CoinsPageClientProps) {
  const [page, setPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(mockAllCoins.length / perPage);
  
  const paginatedCoins = mockAllCoins.slice((page - 1) * perPage, page * perPage);

  return (
    <main className="main-container">
      <h1 className="text-2xl font-bold mb-6">All Coins</h1>
      <CoinsTable coins={paginatedCoins} />
      <CoinsPagination 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={setPage} 
      />
    </main>
  );
}
