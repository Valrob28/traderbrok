import React, { useState } from 'react';
import { TradingInterface } from './components/TradingInterface';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Portfolio } from './components/Portfolio';

function App() {
  const [selectedMarket, setSelectedMarket] = useState('ETH-USD');
  const [activeTab, setActiveTab] = useState('trade');

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar 
          selectedMarket={selectedMarket}
          onMarketSelect={setSelectedMarket}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="flex-1 flex flex-col">
          {activeTab === 'trade' && (
            <TradingInterface selectedMarket={selectedMarket} />
          )}
          {activeTab === 'portfolio' && (
            <Portfolio />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;