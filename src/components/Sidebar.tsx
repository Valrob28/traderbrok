import React from 'react';
import { TrendingUp, Wallet, BarChart3, History } from 'lucide-react';
import { usePricing } from '../hooks/usePricing';

interface SidebarProps {
  selectedMarket: string;
  onMarketSelect: (market: string) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  selectedMarket, 
  onMarketSelect, 
  activeTab, 
  onTabChange 
}) => {
  const { markets } = usePricing();

  const tabs = [
    { id: 'trade', label: 'Trade', icon: TrendingUp },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <div className="w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex space-x-1 bg-gray-700 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'trade' && (
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Markets</h3>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search TraderBroke markets..."
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="space-y-1">
              {markets.map((market) => (
                <button
                  key={market.symbol}
                  onClick={() => onMarketSelect(market.symbol)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    selectedMarket === market.symbol
                      ? 'bg-blue-600/20 border border-blue-600/30'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{market.symbol}</span>
                    <span className={`text-sm ${
                      market.change >= 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {market.change >= 0 ? '+' : ''}{market.change}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>${market.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    <span>{market.volume}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                    <span>H: ${market.high24h.toFixed(2)}</span>
                    <span>L: ${market.low24h.toFixed(2)}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="flex-1 p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">TraderBroke Stats</h3>
          <div className="space-y-3">
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-xs text-gray-400">Total Portfolio</div>
              <div className="text-lg font-bold">$12,345.67</div>
              <div className="text-xs text-green-400">+2.34%</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-xs text-gray-400">Available Balance</div>
              <div className="text-lg font-bold">$8,234.56</div>
            </div>
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="text-xs text-gray-400">Total PnL</div>
              <div className="text-lg font-bold text-green-400">+$1,234.56</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};