import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';

interface Order {
  id: string;
  market: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  size: number;
  price: number;
  filled: number;
  status: 'open' | 'filled' | 'cancelled';
  time: string;
}

export const OpenOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'open' | 'filled' | 'cancelled'>('open');
  const [orders] = useState<Order[]>([
    {
      id: '1',
      market: 'ETH-USD',
      side: 'buy',
      type: 'limit',
      size: 2.5,
      price: 2340.00,
      filled: 0,
      status: 'open',
      time: '14:23:45'
    },
    {
      id: '2',
      market: 'BTC-USD',
      side: 'sell',
      type: 'limit',
      size: 0.1,
      price: 43500.00,
      filled: 0,
      status: 'open',
      time: '14:15:32'
    },
    {
      id: '3',
      market: 'ETH-USD',
      side: 'buy',
      type: 'market',
      size: 1.0,
      price: 2345.67,
      filled: 1.0,
      status: 'filled',
      time: '14:10:15'
    }
  ]);

  const tabs = [
    { id: 'open', label: 'Open Orders' },
    { id: 'filled', label: 'Order History' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'filled') return order.status === 'filled';
    if (activeTab === 'cancelled') return order.status === 'cancelled';
    return order.status === 'open';
  });

  return (
    <div className="h-64 flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredOrders.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No {activeTab} orders</p>
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="grid grid-cols-8 gap-4 mb-3 text-xs text-gray-400">
              <span>Market</span>
              <span>Side</span>
              <span>Type</span>
              <span>Size</span>
              <span>Price</span>
              <span>Filled</span>
              <span>Time</span>
              <span></span>
            </div>
            
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-8 gap-4 py-2 hover:bg-gray-800 rounded transition-colors text-sm"
              >
                <span className="font-medium">{order.market}</span>
                <span className={order.side === 'buy' ? 'text-green-400' : 'text-red-400'}>
                  {order.side.toUpperCase()}
                </span>
                <span className="text-gray-400">{order.type}</span>
                <span>{order.size}</span>
                <span>${order.price.toFixed(2)}</span>
                <span className="text-gray-400">{order.filled}/{order.size}</span>
                <span className="text-gray-400">{order.time}</span>
                <div className="flex justify-end">
                  {order.status === 'open' && (
                    <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                      <X className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};