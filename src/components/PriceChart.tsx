import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface PriceChartProps {
  selectedMarket: string;
  currentPrice: number;
}

interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const PriceChart: React.FC<PriceChartProps> = ({ selectedMarket, currentPrice }) => {
  const [timeframe, setTimeframe] = useState('1h');
  const [chartData, setChartData] = useState<CandlestickData[]>([]);

  useEffect(() => {
    // Generate mock candlestick data
    const generateChartData = () => {
      const data: CandlestickData[] = [];
      let price = currentPrice;
      
      for (let i = 0; i < 50; i++) {
        const open = price;
        const change = (Math.random() - 0.5) * 20;
        const close = open + change;
        const high = Math.max(open, close) + Math.random() * 10;
        const low = Math.min(open, close) - Math.random() * 10;
        const volume = Math.random() * 1000000;
        
        data.push({
          time: new Date(Date.now() - (49 - i) * 3600000).toISOString(),
          open,
          high,
          low,
          close,
          volume
        });
        
        price = close;
      }
      
      setChartData(data);
    };

    generateChartData();
  }, [currentPrice]);

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d', '1w'];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-400">Price Chart</h3>
          <div className="flex space-x-1">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  timeframe === tf
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-gray-400">High:</span>
            <span className="text-green-400">${(currentPrice * 1.05).toFixed(2)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-gray-400">Low:</span>
            <span className="text-red-400">${(currentPrice * 0.95).toFixed(2)}</span>
          </div>
          <div>
            <span className="text-gray-400">Volume:</span>
            <span className="ml-2">1.2M</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="w-full h-full bg-gray-900 rounded-lg p-4 relative overflow-hidden">
          {/* Simplified chart visualization */}
          <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
            {chartData.slice(-20).map((candle, index) => {
              const isGreen = candle.close > candle.open;
              const height = Math.abs(candle.close - candle.open) * 5;
              
              return (
                <div
                  key={index}
                  className="flex flex-col items-center"
                  style={{ width: 'calc(100% / 20)' }}
                >
                  <div
                    className={`w-2 ${isGreen ? 'bg-green-400' : 'bg-red-400'} rounded-sm`}
                    style={{ height: Math.max(height, 2) }}
                  />
                </div>
              );
            })}
          </div>
          
          {/* Grid lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 border-t border-gray-700/50"
                style={{ top: `${(i + 1) * 20}%` }}
              />
            ))}
          </div>
          
          {/* Price labels */}
          <div className="absolute right-2 top-4 text-xs text-gray-400">
            ${(currentPrice * 1.1).toFixed(2)}
          </div>
          <div className="absolute right-2 bottom-4 text-xs text-gray-400">
            ${(currentPrice * 0.9).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};