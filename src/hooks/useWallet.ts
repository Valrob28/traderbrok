import { useState, useEffect } from 'react';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balance: number;
  isConnecting: boolean;
}

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    balance: 0,
    isConnecting: false
  });

  const connectWallet = async () => {
    setWallet(prev => ({ ...prev, isConnecting: true }));
    
    try {
      // Simulate wallet connection delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock wallet address
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      const mockBalance = Math.random() * 50000 + 10000; // Random balance between 10k-60k
      
      setWallet({
        isConnected: true,
        address: mockAddress,
        balance: mockBalance,
        isConnecting: false
      });
      
      // Store in localStorage for persistence
      localStorage.setItem('wallet', JSON.stringify({
        isConnected: true,
        address: mockAddress,
        balance: mockBalance
      }));
    } catch (error) {
      setWallet(prev => ({ ...prev, isConnecting: false }));
    }
  };

  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: null,
      balance: 0,
      isConnecting: false
    });
    localStorage.removeItem('wallet');
  };

  // Load wallet from localStorage on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet');
    if (savedWallet) {
      const parsed = JSON.parse(savedWallet);
      setWallet({
        ...parsed,
        isConnecting: false
      });
    }
  }, []);

  return {
    wallet,
    connectWallet,
    disconnectWallet
  };
};