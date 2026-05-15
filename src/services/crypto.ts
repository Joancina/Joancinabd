import { useState, useEffect } from 'react';

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  image?: string;
}

export function useCryptoPrices() {
  const [prices, setPrices] = useState<CoinPrice[]>([
    { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', current_price: 65000, price_change_percentage_24h: 1.2 },
    { id: 'ethereum', symbol: 'eth', name: 'Ethereum', current_price: 3500, price_change_percentage_24h: -0.5 },
    { id: 'binancecoin', symbol: 'bnb', name: 'BNB', current_price: 600, price_change_percentage_24h: 2.1 },
    { id: 'tether', symbol: 'usdt', name: 'Tether', current_price: 1, price_change_percentage_24h: 0.01 },
  ]);
  const [loading, setLoading] = useState(true);

  const fetchPrices = async () => {
    try {
      // Using a mock fetch but structured for a real API like CoinGecko
      // In a real app, you'd use: fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,tether')
      // For the demo, I'll simulate updates
      const updated = prices.map(p => ({
        ...p,
        current_price: p.current_price * (1 + (Math.random() * 0.01 - 0.005)),
        price_change_percentage_24h: p.price_change_percentage_24h + (Math.random() * 0.1 - 0.05)
      }));
      setPrices(updated);
      setLoading(false);
    } catch (error) {
      console.error("Price fetch error", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  return { prices, loading };
}

export const USD_TO_BDT = 120; // Example conversion rate
