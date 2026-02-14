"use server";

export async function fetcher<T>(): Promise<T> {
  return {} as T;
}

function generateMockChartData(basePrice: number, days: number = 30): { time: string; value: number }[] {
  const data: { time: string; value: number }[] = [];
  const now = new Date();
  let price = basePrice * 0.85;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const change = (Math.random() - 0.45) * basePrice * 0.03;
    price = Math.max(price + change, basePrice * 0.5);
    price = Math.min(price, basePrice * 1.2);
    
    data.push({
      time: date.toISOString().split('T')[0],
      value: price
    });
  }
  
  data[data.length - 1].value = basePrice;
  return data;
}

const mockCoin = {
  id: "bitcoin",
  symbol: "btc",
  name: "Bitcoin",
  image: { large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png" },
  market_data: {
    current_price: { usd: 89234 },
    price_change_percentage_24h: 2.45,
    market_cap: { usd: 1700000000000 },
    total_volume: { usd: 45000000000 },
    high_24h: { usd: 90500 },
    low_24h: { usd: 87500 },
  },
};

const mockTrending = {
  coins: [
    { item: { id: "bitcoin", name: "Bitcoin", symbol: "BTC", market_cap_rank: 1, thumb: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png", large: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png", price_btc: 1 }},
    { item: { id: "ethereum", name: "Ethereum", symbol: "ETH", market_cap_rank: 2, thumb: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png", large: "https://assets.coingecko.com/coins/images/279/large/ethereum.png", price_btc: 0.05 }},
    { item: { id: "solana", name: "Solana", symbol: "SOL", market_cap_rank: 3, thumb: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png", large: "https://assets.coingecko.com/coins/images/4128/large/solana.png", price_btc: 0.003 }},
  ],
};

const mockMarketCoins = [
  { id: "bitcoin", symbol: "btc", name: "Bitcoin", image: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png", current_price: 89234, market_cap: 1700000000000, market_cap_rank: 1, price_change_percentage_24h: 2.45, total_volume: 45000000000, sparkline_in_7d: { price: generateMockChartData(89234, 7).map(d => d.value) } },
  { id: "ethereum", symbol: "eth", name: "Ethereum", image: "https://assets.coingecko.com/coins/images/279/thumb/ethereum.png", current_price: 2345, market_cap: 280000000000, market_cap_rank: 2, price_change_percentage_24h: 3.21, total_volume: 15000000000, sparkline_in_7d: { price: generateMockChartData(2345, 7).map(d => d.value) } },
  { id: "solana", symbol: "sol", name: "Solana", image: "https://assets.coingecko.com/coins/images/4128/thumb/solana.png", current_price: 145, market_cap: 65000000000, market_cap_rank: 3, price_change_percentage_24h: 5.67, total_volume: 3500000000, sparkline_in_7d: { price: generateMockChartData(145, 7).map(d => d.value) } },
  { id: "cardano", symbol: "ada", name: "Cardano", image: "https://assets.coingecko.com/coins/images/975/thumb/cardano.png", current_price: 0.89, market_cap: 31000000000, market_cap_rank: 4, price_change_percentage_24h: -1.23, total_volume: 800000000, sparkline_in_7d: { price: generateMockChartData(0.89, 7).map(d => d.value) } },
  { id: "ripple", symbol: "xrp", name: "XRP", image: "https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png", current_price: 2.15, market_cap: 95000000000, market_cap_rank: 5, price_change_percentage_24h: 1.89, total_volume: 5000000000, sparkline_in_7d: { price: generateMockChartData(2.15, 7).map(d => d.value) } },
];

const mockCategories = [
  { id: "defi", name: "DeFi", coin_count: 1200 },
  { id: "metaverse", name: "Metaverse", coin_count: 850 },
  { id: "gaming", name: "Gaming", coin_count: 620 },
  { id: "stablecoin", name: "Stablecoin", coin_count: 180 },
  { id: "layer-1", name: "Layer 1", coin_count: 450 },
];

export async function getCoinDetails(coinId: string) {
  const basePrice = coinId === 'bitcoin' ? 89234 
    : coinId === 'ethereum' ? 2345 
    : coinId === 'solana' ? 145 
    : coinId === 'cardano' ? 0.89 
    : coinId === 'ripple' ? 2.15 
    : 100;
    
  return {
    ...mockCoin,
    id: coinId,
    market_data: {
      ...mockCoin.market_data,
      current_price: { usd: basePrice },
    },
  } as any;
}

export async function getTrendingCoins() {
  return mockTrending as any;
}

export async function getMarketCoins(currency = "usd", perPage = 100) {
  return mockMarketCoins as any;
}

export async function getCoinCategories() {
  return mockCategories as any;
}

export async function getCoinChartData(coinId: string, days: number = 30) {
  const basePrice = coinId === 'bitcoin' ? 89234 
    : coinId === 'ethereum' ? 2345 
    : coinId === 'solana' ? 145 
    : coinId === 'cardano' ? 0.89 
    : coinId === 'ripple' ? 2.15 
    : 100;
    
  return generateMockChartData(basePrice, days);
}
