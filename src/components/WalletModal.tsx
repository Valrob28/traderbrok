import React from 'react';
import { X, Wallet, Shield, Zap } from 'lucide-react';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: () => void;
  isConnecting: boolean;
}

const walletOptions = [
  {
    name: 'MetaMask',
    icon: '🦊',
    description: 'Connect using browser wallet',
    popular: true
  },
  {
    name: 'WalletConnect',
    icon: '🔗',
    description: 'Scan with mobile wallet',
    popular: false
  },
  {
    name: 'Coinbase Wallet',
    icon: '🔵',
    description: 'Connect with Coinbase',
    popular: false
  },
  {
    name: 'Phantom',
    icon: '👻',
    description: 'Solana wallet support',
    popular: false
  }
];

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onConnect,
  isConnecting
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Connect to TraderBroke</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6">
          {walletOptions.map((wallet) => (
            <button
              key={wallet.name}
              onClick={onConnect}
              disabled={isConnecting}
              className="w-full p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{wallet.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{wallet.name}</span>
                    {wallet.popular && (
                      <span className="px-2 py-1 bg-blue-600 text-xs rounded">Popular</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{wallet.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {isConnecting && (
          <div className="text-center py-4">
            <div className="inline-flex items-center space-x-2 text-blue-400">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
              <span>Connecting wallet...</span>
            </div>
          </div>
        )}

        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-start space-x-3 text-sm text-gray-400">
            <Shield className="w-5 h-5 text-green-400 mt-0.5" />
            <div>
              <p className="font-medium text-white mb-1">TraderBroke Security</p>
              <p>Your wallet connects securely to TraderBroke. We never store your private keys or personal data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};