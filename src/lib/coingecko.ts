"use server";

import qs from "query-string";

const baseUrl = process.env.NEXT_PUBLIC_COINGECKO_BASE_URL;
const apiKey = process.env.NEXT_PUBLIC_COINGECKO_API_KEY;

if (!baseUrl) throw new Error("Couldn't get base URL");
if (!apiKey) throw new Error("Couldn't get API key");

export async function fetcher<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${baseUrl}${endpoint}`,
      query: {
        ...params,
        x_cg_demo_api_key: apiKey,
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
