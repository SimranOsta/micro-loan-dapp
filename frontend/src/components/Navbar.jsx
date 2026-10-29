import React from 'react';
import { Wallet, HandCoins } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, account, connectWallet }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setActiveTab('landing')} style={{ cursor: 'pointer' }}>
        <HandCoins className="icon-emerald" />
        <span>MicroLoan<strong>DApp</strong></span>
      </div>

      <div className="tab-group">
        <button 
          className={`tab-btn ${activeTab === 'landing' ? 'active' : ''}`}
          onClick={() => setActiveTab('landing')}
        >
          Home
        </button>
        <button 
          className={`tab-btn ${activeTab === 'borrower' ? 'active' : ''}`}
          onClick={() => setActiveTab('borrower')}
        >
          Borrower
        </button>
        <button 
          className={`tab-btn ${activeTab === 'lender' ? 'active' : ''}`}
          onClick={() => setActiveTab('lender')}
        >
          Lender Hub
        </button>
      </div>

      <button className="connect-btn" onClick={connectWallet}>
        <Wallet size={18} />
        {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
      </button>
    </nav>
  );
}