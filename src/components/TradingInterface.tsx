import React, { useState, useEffect } from 'react';
import { usePricing } from '../hooks/usePricing';
import { OrderBook } from './OrderBook';
import { PriceChart } from './PriceChart';
import { TradingForm } from './TradingForm';
import { RecentTrades } from './RecentTrades';
import { OpenOrders } from './OpenOrders';

interface TradingInterfaceProps {
  selectedMarket: string;
}

export const TradingInterface: React.FC<TradingInterfaceProps> = ({ selectedMarket }) => {
  const { getMarketData } = usePricing();
  const marketData = getMarketData(selectedMarket);
  
  if (!marketData) {
    return <div className="flex-1 flex items-center justify-center">Market not found</div>;
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Market Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div>
              <h1 className="text-xl font-bold">{selectedMarket} Perpetual</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>TraderBroke Exchange</span>
                <span>•</span>
                <span>Cross Margin</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div>
                <div className="text-xs text-gray-400">Mark Price</div>
                <div className={`text-lg font-bold ${
                  marketData.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  ${marketData.price.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">24h Change</div>
                <div className={`text-lg font-bold ${
                  marketData.change >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {marketData.change >= 0 ? '+' : ''}{marketData.change.toFixed(2)}%
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-400">24h Volume</div>
                <div className="text-lg font-bold">${marketData.volume}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">24h High</div>
                <div className="text-lg font-bold text-green-400">${marketData.high24h.toFixed(2)}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">24h Low</div>
                <div className="text-lg font-bold text-red-400">${marketData.low24h.toFixed(2)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex">
            <div className="flex-1 p-4">
              <PriceChart selectedMarket={selectedMarket} currentPrice={marketData.price} />
            </div>
            <div className="w-80 border-l border-gray-700">
              <OrderBook currentPrice={marketData.price} />
            </div>
          </div>
          <div className="border-t border-gray-700">
            <OpenOrders />
          </div>
        </div>
        
        <div className="w-96 border-l border-gray-700 flex flex-col">
          <div className="flex-1">
            <TradingForm selectedMarket={selectedMarket} currentPrice={marketData.price} />
          </div>
          <div className="border-t border-gray-700">
            <RecentTrades currentPrice={marketData.price} />
          </div>
        </div>
      </div>
    </div>
  );
};