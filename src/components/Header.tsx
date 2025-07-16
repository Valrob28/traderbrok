import React from 'react';
import { Activity, Wallet, Settings, Bell, ChevronDown, Copy, ExternalLink, LogOut } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { WalletModal } from './WalletModal';

export const Header: React.FC = () => {
  const { wallet, connectWallet, disconnectWallet } = useWallet();
  const [showWalletModal, setShowWalletModal] = React.useState(false);
  const [showWalletMenu, setShowWalletMenu] = React.useState(false);

  const handleConnectClick = () => {
    setShowWalletModal(true);
  };

  const handleWalletConnect = async () => {
    await connectWallet();
    setShowWalletModal(false);
  };

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <>
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 text-blue-400" />
            <span className="text-xl font-bold">TraderBroke</span>
          </div>
          <nav className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Trading</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Portfolio</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Analytics</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Markets</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a>
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-700 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-sm text-gray-300">Mainnet</span>
          </div>
          
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
          </button>
          
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>
          
          {!wallet.isConnected ? (
            <button 
              onClick={handleConnectClick}
              disabled={wallet.isConnecting}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
              <Wallet className="w-4 h-4" />
              <span className="text-sm font-medium">
                {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </span>
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowWalletMenu(!showWalletMenu)}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium">{formatAddress(wallet.address!)}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showWalletMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Wallet Address</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono">{formatAddress(wallet.address!)}</span>
                      <button
                        onClick={copyAddress}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-sm text-gray-400 mt-2">
                      Balance: ${wallet.balance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </div>
                  </div>
                  
                  <div className="p-2">
                    <button className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded transition-colors text-left">
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">View on Explorer</span>
                    </button>
                    <button
                      onClick={() => {
                        disconnectWallet();
                        setShowWalletMenu(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded transition-colors text-left text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Disconnect</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      </header>

      <WalletModal
        isOpen={showWalletModal}
        onClose={() => setShowWalletModal(false)}
        onConnect={handleWalletConnect}
        isConnecting={wallet.isConnecting}
      />
    </>
  );
};