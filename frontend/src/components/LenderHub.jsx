import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config';

export default function LenderHub({ account }) {
  const [loading, setLoading] = useState(false);

  const handleFundLoan = async (loanId, amountEth) => {
    if (!account) return alert('Please connect your wallet first!');

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Call fundLoan passing ETH value as msg.value
      const tx = await contract.fundLoan(loanId, {
        value: ethers.parseEther(amountEth.toString())
      });
      await tx.wait();

      alert(`Successfully funded Loan #${loanId}!`);
    } catch (err) {
      console.error('Error funding loan:', err);
      alert('Transaction failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-grid">
      <div className="stats-row">
        <div className="card stat-card">
          <span className="stat-label">Total Supplied</span>
          <h3>1.20 ETH</h3>
          <p className="subtext">Across 3 active loans</p>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Claimable Yield</span>
          <h3 className="text-emerald">0.042 ETH</h3>
          <button className="xs-btn">Claim</button>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Current Pool APY</span>
          <h3 className="text-indigo">7.5%</h3>
          <p className="subtext">92% Utilization</p>
        </div>
      </div>

      <div className="card marketplace-card">
        <h3>Open Borrower Requests</h3>
        <div className="request-list">
          <div className="request-item">
            <div>
              <strong>0x8f...3a12</strong>
              <div className="badge">150% Collateralized</div>
            </div>
            <div>
              <span>Request: <strong>0.5 ETH</strong></span>
              <span className="yield-tag">Return: 5% (15 Days)</span>
            </div>
            <button 
              className="primary-btn lender-btn"
              onClick={() => handleFundLoan(1, "0.5")}
              disabled={loading}
            >
              {loading ? 'Funding...' : 'Fund Loan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}