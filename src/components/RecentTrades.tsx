import React, { useState, useEffect } from 'react';

interface RecentTradesProps {
  currentPrice: number;
}

interface Trade {
  id: string;
  price: number;
  size: number;
  side: 'buy' | 'sell';
  time: string;
}

export const RecentTrades: React.FC<RecentTradesProps> = ({ currentPrice }) => {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Generate mock trades
    const generateTrade = (): Trade => ({
      id: Math.random().toString(36).substr(2, 9),
      price: currentPrice + (Math.random() - 0.5) * (currentPrice * 0.01),
      size: Math.random() * 5 + 0.1,
      side: Math.random() > 0.5 ? 'buy' : 'sell',
      time: new Date().toLocaleTimeString()
    });

    // Initial trades
    const initialTrades = Array.from({ length: 20 }, generateTrade);
    setTrades(initialTrades);

    // Simulate real-time trades
    const interval = setInterval(() => {
      setTrades(prev => [generateTrade(), ...prev.slice(0, 19)]);
    }, 2000);

    return () => clearInterval(interval);
  }, [currentPrice]);

  return (
    <div className="h-80 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Trades</h3>
        <div className="grid grid-cols-3 gap-4 text-xs text-gray-400">
          <span>Price</span>
          <span className="text-right">Size</span>
          <span className="text-right">Time</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {trades.map((trade) => (
          <div
            key={trade.id}
            className="px-4 py-2 hover:bg-gray-800 transition-colors border-l-2"
            style={{ borderLeftColor: trade.side === 'buy' ? '#10b981' : '#ef4444' }}
          >
            <div className="grid grid-cols-3 gap-4 text-xs">
              <span className={trade.side === 'buy' ? 'text-green-400' : 'text-red-400'}>
                {trade.price.toFixed(2)}
              </span>
              <span className="text-right">{trade.size.toFixed(3)}</span>
              <span className="text-right text-gray-400">{trade.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};