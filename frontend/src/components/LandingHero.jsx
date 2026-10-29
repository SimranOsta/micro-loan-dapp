import React from 'react';
import { Shield, Zap, TrendingUp, ArrowRight } from 'lucide-react';

export default function LandingHero({ onGetStarted }) {
  return (
    <div className="landing-hero">
      <div className="hero-badge">⚡ Next-Gen DeFi Microloans</div>
      <h1 className="hero-title">
        Instant Decentralized Loans <br />
        <span className="gradient-text">Backed by Smart Contracts</span>
      </h1>
      <p className="hero-subtitle">
        Borrow against crypto collateral with zero intermediaries, or supply liquidity to earn high yields in a trustless ecosystem.
      </p>

      <div className="hero-cta-group">
        <button className="primary-btn borrower-btn hero-btn" onClick={() => onGetStarted('borrower')}>
          Borrow Crypto <ArrowRight size={18} />
        </button>
        <button className="secondary-btn hero-btn" onClick={() => onGetStarted('lender')}>
          Supply & Earn Yield
        </button>
      </div>

      <div className="hero-features">
        <div className="feature-pill"><Shield size={16} /> Non-Custodial Security</div>
        <div className="feature-pill"><Zap size={16} /> Instant Funding</div>
        <div className="feature-pill"><TrendingUp size={16} /> Automated APY Yields</div>
      </div>
    </div>
  );
}