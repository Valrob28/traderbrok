import { useState, useEffect, useCallback } from 'react';

export interface MarketData {
  symbol: string;
  price: number;
  change: number;
  volume: string;
  high24h: number;
  low24h: number;
  lastUpdate: number;
}

const initialMarkets: MarketData[] = [
  { symbol: 'ETH-USD', price: 2345.67, change: 2.34, volume: '1.2B', high24h: 2456.78, low24h: 2234.56, lastUpdate: Date.now() },
  { symbol: 'BTC-USD', price: 43250.00, change: -1.25, volume: '2.8B', high24h: 44123.45, low24h: 42567.89, lastUpdate: Date.now() },
  { symbol: 'SOL-USD', price: 98.45, change: 5.67, volume: '456M', high24h: 102.34, low24h: 89.12, lastUpdate: Date.now() },
  { symbol: 'AVAX-USD', price: 37.89, change: 3.21, volume: '234M', high24h: 39.45, low24h: 35.67, lastUpdate: Date.now() },
  { symbol: 'ARB-USD', price: 1.89, change: -0.45, volume: '123M', high24h: 1.95, low24h: 1.78, lastUpdate: Date.now() },
  { symbol: 'OP-USD', price: 2.34, change: 1.87, volume: '89M', high24h: 2.45, low24h: 2.12, lastUpdate: Date.now() },
  { symbol: 'MATIC-USD', price: 0.87, change: -2.14, volume: '67M', high24h: 0.92, low24h: 0.81, lastUpdate: Date.now() },
  { symbol: 'LINK-USD', price: 14.56, change: 4.23, volume: '145M', high24h: 15.12, low24h: 13.89, lastUpdate: Date.now() },
  { symbol: 'UNI-USD', price: 6.78, change: -1.56, volume: '78M', high24h: 7.12, low24h: 6.45, lastUpdate: Date.now() },
  { symbol: 'AAVE-USD', price: 89.34, change: 2.87, volume: '34M', high24h: 92.45, low24h: 85.67, lastUpdate: Date.now() },
  { symbol: 'ABS-USD', price: 0.45, change: 8.92, volume: '156M', high24h: 0.48, low24h: 0.41, lastUpdate: Date.now() },
  { symbol: 'ABST-USD', price: 12.67, change: -3.45, volume: '89M', high24h: 13.21, low24h: 12.34, lastUpdate: Date.now() },
  { symbol: 'CHAIN-USD', price: 3.21, change: 6.78, volume: '234M', high24h: 3.45, low24h: 2.98, lastUpdate: Date.now() },
  { symbol: 'ABSTRACT-USD', price: 156.78, change: 4.56, volume: '67M', high24h: 162.34, low24h: 149.23, lastUpdate: Date.now() },
];

export const usePricing = () => {
  const [markets, setMarkets] = useState<MarketData[]>(initialMarkets);

  const updateMarketPrice = useCallback((symbol: string) => {
    setMarkets(prev => prev.map(market => {
      if (market.symbol === symbol) {
        // Generate realistic price movement (±0.5% typically)
        const volatility = 0.005; // 0.5% base volatility
        const randomFactor = (Math.random() - 0.5) * 2; // -1 to 1
        const priceChange = market.price * volatility * randomFactor;
        const newPrice = Math.max(0.01, market.price + priceChange);
        
        // Calculate percentage change
        const percentChange = ((newPrice - market.price) / market.price) * 100;
        
        // Update 24h high/low
        const newHigh = Math.max(market.high24h, newPrice);
        const newLow = Math.min(market.low24h, newPrice);
        
        // Simulate volume changes
        const volumeMultiplier = Math.random() * 0.1 + 0.95; // 95% to 105%
        const currentVolume = parseFloat(market.volume.replace(/[BM]/g, ''));
        const newVolumeValue = currentVolume * volumeMultiplier;
        const newVolume = newVolumeValue >= 1000 
          ? `${(newVolumeValue / 1000).toFixed(1)}B`
          : `${newVolumeValue.toFixed(0)}M`;

        return {
          ...market,
          price: newPrice,
          change: market.change + percentChange,
          volume: newVolume,
          high24h: newHigh,
          low24h: newLow,
          lastUpdate: Date.now()
        };
      }
      return market;
    }));
  }, []);

  const updateAllPrices = useCallback(() => {
    markets.forEach(market => {
      // Stagger updates to make them feel more natural
      setTimeout(() => {
        updateMarketPrice(market.symbol);
      }, Math.random() * 1000);
    });
  }, [markets, updateMarketPrice]);

  // Update prices every 2-5 seconds with random intervals
  useEffect(() => {
    const interval = setInterval(() => {
      updateAllPrices();
    }, Math.random() * 3000 + 2000); // 2-5 seconds

    return () => clearInterval(interval);
  }, [updateAllPrices]);

  // Individual market updates for more frequent changes
  useEffect(() => {
    const intervals = markets.map(market => {
      return setInterval(() => {
        updateMarketPrice(market.symbol);
      }, Math.random() * 5000 + 3000); // 3-8 seconds per market
    });

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [markets.length, updateMarketPrice]);

  const getMarketData = (symbol: string) => {
    return markets.find(market => market.symbol === symbol);
  };

  return {
    markets,
    getMarketData,
    updateMarketPrice
  };
};