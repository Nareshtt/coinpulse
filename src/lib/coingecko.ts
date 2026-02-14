"use server";

import qs from "query-string";

const baseUrl = process.env.NEXT_PUBLIC_COINGECKO_BASE_URL || "https://api.coingecko.com/api/v3";

export async function fetcher<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${baseUrl}${endpoint}`,
      query: {
        ...params,
      },
    },
    { skipEmptyString: true, skipNull: true }
  );

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function getCoinDetails(coinId: string) {
  return fetcher(`/coins/${coinId}`, {
    localization: false,
    tickers: false,
    market_data: true,
    community_data: false,
    developer_data: false,
    sparkline: true,
  });
}

export async function getTrendingCoins() {
  return fetcher("/search/trending");
}

export async function getMarketCoins(currency = "usd", perPage = 100) {
  return fetcher("/coins/markets", {
    vs_currency: currency,
    order: "market_cap_desc",
    per_page: perPage,
    page: 1,
    sparkline: true,
    price_change_percentage: "24h,7d",
  });
}

export async function getCoinCategories() {
  return fetcher("/coins/categories");
}
