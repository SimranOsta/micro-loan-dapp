import React, { useState } from 'react';
import FallingCoins from './components/FallingCoins';
import LandingHero from './components/LandingHero';
import BorrowerDashboard from './components/BorrowerDashboard';
import LenderHub from './components/LenderHub';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("Wallet connection rejected", err);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  return (
    <div className="app-container">
      {/* Background Falling Coins Canvas */}
      <FallingCoins />

      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        account={account} 
        connectWallet={connectWallet} 
      />

      <main className="main-content">
        {activeTab === 'landing' && <LandingHero onGetStarted={(tab) => setActiveTab(tab)} />}
        {activeTab === 'borrower' && <BorrowerDashboard account={account} />}
        {activeTab === 'lender' && <LenderHub account={account} />}
      </main>
    </div>
  );
}

export default App;