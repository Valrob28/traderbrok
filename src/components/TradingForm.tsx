import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

interface TradingFormProps {
  selectedMarket: string;
  currentPrice: number;
}

export const TradingForm: React.FC<TradingFormProps> = ({ selectedMarket, currentPrice }) => {
  const { wallet } = useWallet();
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState(currentPrice.toFixed(2));
  const [leverage, setLeverage] = useState(10);

  // Update price when currentPrice changes
  React.useEffect(() => {
    setPrice(currentPrice.toFixed(2));
  }, [currentPrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    console.log('Order submitted:', { side, orderType, size, price, leverage });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h3 className="text-sm font-medium text-gray-400 mb-3">TraderBroke - {selectedMarket}</h3>
        
        {/* Buy/Sell Toggle */}
        <div className="flex bg-gray-800 p-1 rounded-lg mb-4">
          <button
            onClick={() => setSide('buy')}
            className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${
              side === 'buy'
                ? 'bg-green-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setSide('sell')}
            className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${
              side === 'sell'
                ? 'bg-red-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Sell
          </button>
        </div>

        {/* Order Type */}
        <div className="flex bg-gray-800 p-1 rounded-lg mb-4">
          <button
            onClick={() => setOrderType('market')}
            className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${
              orderType === 'market'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Market
          </button>
          <button
            onClick={() => setOrderType('limit')}
            className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${
              orderType === 'limit'
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Limit
          </button>
        </div>

        {/* Leverage */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-2">Leverage</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLeverage(Math.max(1, leverage - 1))}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-lg font-bold min-w-[60px] text-center">{leverage}x</span>
            <button
              onClick={() => setLeverage(Math.min(100, leverage + 1))}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Trading Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {orderType === 'limit' && (
            <div>
              <label className="block text-xs text-gray-400 mb-2">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                placeholder="0.00"
                step="0.01"
              />
            </div>
          )}

          <div>
            <label className="block text-xs text-gray-400 mb-2">Size</label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
              placeholder="0.00"
              step="0.001"
            />
          </div>

          {/* Quick Size Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {['25%', '50%', '75%', '100%'].map((percentage) => (
              <button
                key={percentage}
                type="button"
                onClick={() => setSize((parseFloat(percentage) / 100 * 10).toFixed(3))}
                className="py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded transition-colors"
              >
                {percentage}
              </button>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-800 p-3 rounded-lg space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-400">Est. Total</span>
              <span>${(parseFloat(size || '0') * currentPrice).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Margin Required</span>
              <span>${(parseFloat(size || '0') * currentPrice / leverage).toFixed(2)}</span>
            </div>
            {wallet.isConnected && (
              <div className="flex justify-between">
                <span className="text-gray-400">Available Balance</span>
                <span>${wallet.balance.toFixed(2)}</span>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={!wallet.isConnected}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              !wallet.isConnected
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : side === 'buy'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {!wallet.isConnected 
              ? 'Connect Wallet to Trade'
              : `${side === 'buy' ? 'Buy' : 'Sell'} ${selectedMarket}`
            }
          </button>
        </form>
      </div>
    </div>
  );
};