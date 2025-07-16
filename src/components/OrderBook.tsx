import React, { useState, useEffect } from 'react';

interface OrderBookProps {
  currentPrice: number;
}

interface OrderBookEntry {
  price: number;
  size: number;
  total: number;
}

export const OrderBook: React.FC<OrderBookProps> = ({ currentPrice }) => {
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [spread, setSpread] = useState(0);

  useEffect(() => {
    // Simulate real-time order book updates
    const generateOrderBook = () => {
      const basePrice = currentPrice;
      const newBids: OrderBookEntry[] = [];
      const newAsks: OrderBookEntry[] = [];

      // Generate bids (buy orders)
      for (let i = 0; i < 10; i++) {
        const price = basePrice - (i + 1) * 0.1;
        const size = Math.random() * 50 + 10;
        const total = i === 0 ? size : newBids[i - 1].total + size;
        newBids.push({ price, size, total });
      }

      // Generate asks (sell orders)
      for (let i = 0; i < 10; i++) {
        const price = basePrice + (i + 1) * 0.1;
        const size = Math.random() * 50 + 10;
        const total = i === 0 ? size : newAsks[i - 1].total + size;
        newAsks.push({ price, size, total });
      }

      setBids(newBids);
      setAsks(newAsks);
      setSpread(newAsks[0]?.price - newBids[0]?.price || 0);
    };

    generateOrderBook();
    const interval = setInterval(generateOrderBook, 1000);

    return () => clearInterval(interval);
  }, [currentPrice]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Order Book</h3>
        <div className="grid grid-cols-3 gap-4 text-xs text-gray-400">
          <span>Price</span>
          <span className="text-right">Size</span>
          <span className="text-right">Total</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Asks (Sell Orders) */}
        <div className="flex-1 flex flex-col-reverse overflow-y-auto">
          {asks.map((ask, index) => (
            <div
              key={index}
              className="relative px-4 py-1 hover:bg-gray-800 transition-colors"
            >
              <div
                className="absolute inset-y-0 right-0 bg-red-500/10"
                style={{ width: `${(ask.total / asks[asks.length - 1]?.total) * 100}%` }}
              />
              <div className="relative grid grid-cols-3 gap-4 text-xs">
                <span className="text-red-400">{ask.price.toFixed(2)}</span>
                <span className="text-right">{ask.size.toFixed(2)}</span>
                <span className="text-right text-gray-400">{ask.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Spread */}
        <div className="px-4 py-2 bg-gray-800 border-y border-gray-700">
          <div className="text-center text-xs text-gray-400">
            Spread: <span className="text-yellow-400">{spread.toFixed(2)}</span>
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="flex-1 overflow-y-auto">
          {bids.map((bid, index) => (
            <div
              key={index}
              className="relative px-4 py-1 hover:bg-gray-800 transition-colors"
            >
              <div
                className="absolute inset-y-0 right-0 bg-green-500/10"
                style={{ width: `${(bid.total / bids[bids.length - 1]?.total) * 100}%` }}
              />
              <div className="relative grid grid-cols-3 gap-4 text-xs">
                <span className="text-green-400">{bid.price.toFixed(2)}</span>
                <span className="text-right">{bid.size.toFixed(2)}</span>
                <span className="text-right text-gray-400">{bid.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};