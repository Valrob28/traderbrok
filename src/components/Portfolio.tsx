import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Eye, EyeOff, Wallet } from 'lucide-react';

interface Position {
  market: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  markPrice: number;
  pnl: number;
  pnlPercent: number;
  leverage: number;
  margin: number;
}

export const Portfolio: React.FC = () => {
  const [hideBalances, setHideBalances] = useState(false);
  const [positions] = useState<Position[]>([
    {
      market: 'ETH-USD',
      side: 'long',
      size: 2.5,
      entryPrice: 2300.00,
      markPrice: 2345.67,
      pnl: 114.18,
      pnlPercent: 4.97,
      leverage: 10,
      margin: 575.00
    },
    {
      market: 'BTC-USD',
      side: 'short',
      size: 0.1,
      entryPrice: 43500.00,
      markPrice: 43250.00,
      pnl: 25.00,
      pnlPercent: 0.57,
      leverage: 5,
      margin: 865.00
    }
  ]);

  const totalPnl = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const totalMargin = positions.reduce((sum, pos) => sum + pos.margin, 0);

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      {/* Portfolio Summary */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">TraderBroke Portfolio</h2>
          <button
            onClick={() => setHideBalances(!hideBalances)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {hideBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="text-sm">{hideBalances ? 'Show' : 'Hide'} Balances</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Wallet className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-400">Total Balance</span>
            </div>
            <div className="text-2xl font-bold">
              {hideBalances ? '***' : '$12,345.67'}
            </div>
            <div className="text-sm text-green-400">+2.34%</div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-400">Unrealized PnL</span>
            </div>
            <div className={`text-2xl font-bold ${totalPnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {hideBalances ? '***' : `$${totalPnl.toFixed(2)}`}
            </div>
            <div className="text-sm text-gray-400">Today</div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-400">Margin Used</span>
            </div>
            <div className="text-2xl font-bold">
              {hideBalances ? '***' : `$${totalMargin.toFixed(2)}`}
            </div>
            <div className="text-sm text-gray-400">of $10,000</div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Wallet className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Free Margin</span>
            </div>
            <div className="text-2xl font-bold">
              {hideBalances ? '***' : `$${(10000 - totalMargin).toFixed(2)}`}
            </div>
            <div className="text-sm text-gray-400">Available</div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Open Positions</h3>
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="grid grid-cols-9 gap-4 text-sm text-gray-400">
              <span>Market</span>
              <span>Side</span>
              <span>Size</span>
              <span>Entry Price</span>
              <span>Mark Price</span>
              <span>PnL</span>
              <span>PnL %</span>
              <span>Leverage</span>
              <span>Margin</span>
            </div>
          </div>
          
          {positions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No open positions
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {positions.map((position, index) => (
                <div key={index} className="p-4 hover:bg-gray-700 transition-colors">
                  <div className="grid grid-cols-9 gap-4 text-sm">
                    <span className="font-medium">{position.market}</span>
                    <span className={`font-medium ${
                      position.side === 'long' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {position.side.toUpperCase()}
                    </span>
                    <span>{position.size}</span>
                    <span>${position.entryPrice.toFixed(2)}</span>
                    <span>${position.markPrice.toFixed(2)}</span>
                    <span className={position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {hideBalances ? '***' : `$${position.pnl.toFixed(2)}`}
                    </span>
                    <span className={position.pnlPercent >= 0 ? 'text-green-400' : 'text-red-400'}>
                      {hideBalances ? '***' : `${position.pnlPercent >= 0 ? '+' : ''}${position.pnlPercent.toFixed(2)}%`}
                    </span>
                    <span>{position.leverage}x</span>
                    <span>{hideBalances ? '***' : `$${position.margin.toFixed(2)}`}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Balance Details */}
      <div>
        <h3 className="text-xl font-bold mb-4">Balance Details</h3>
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-gray-700">
            <div className="grid grid-cols-4 gap-4 text-sm text-gray-400">
              <span>Asset</span>
              <span>Balance</span>
              <span>USD Value</span>
              <span>Available</span>
            </div>
          </div>
          
          <div className="divide-y divide-gray-700">
            {[
              { asset: 'USDC', balance: '10,000.00', usdValue: '10,000.00', available: '8,560.00' },
              { asset: 'ETH', balance: '2.5', usdValue: '5,864.18', available: '0.0' },
              { asset: 'BTC', balance: '0.1', usdValue: '4,325.00', available: '0.0' }
            ].map((item, index) => (
              <div key={index} className="p-4 hover:bg-gray-700 transition-colors">
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <span className="font-medium">{item.asset}</span>
                  <span>{hideBalances ? '***' : item.balance}</span>
                  <span>{hideBalances ? '***' : `$${item.usdValue}`}</span>
                  <span>{hideBalances ? '***' : item.available}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};