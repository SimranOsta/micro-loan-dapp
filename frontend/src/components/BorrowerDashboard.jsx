import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config';

export default function BorrowerDashboard({ account }) {
  const [amount, setAmount] = useState('');
  const [duration, setDuration] = useState('30');
  const [loading, setLoading] = useState(false);

  const handleRequestLoan = async (e) => {
    e.preventDefault();
    if (!account) return alert('Please connect your wallet first!');
    if (!amount || amount <= 0) return alert('Please enter a valid ETH amount');

    try {
      setLoading(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const principalWei = ethers.parseEther(amount.toString());

      // 1. Calculate repayment based on duration APR (7d: 3%, 15d: 5%, 30d: 8%)
      let aprMultiplier = 1.08;
      if (duration === '7') aprMultiplier = 1.03;
      if (duration === '15') aprMultiplier = 1.05;

      // Multiply safely using BigInt
      const repaymentWei = (principalWei * BigInt(Math.floor(aprMultiplier * 100))) / 100n;

      // 2. Calculate due date timestamp (current time in seconds + duration days in seconds)
      const durationDays = parseInt(duration);
      const dueDate = Math.floor(Date.now() / 1000) + (durationDays * 24 * 60 * 60);

      // 3. Call requestLoan with all 3 arguments expected by your smart contract
      const tx = await contract.requestLoan(principalWei, repaymentWei, dueDate);
      await tx.wait();

      alert('Loan request created successfully on the blockchain!');
      setAmount('');
    } catch (err) {
      console.error('Error submitting loan request:', err);
      alert('Transaction failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-grid">
      <div className="stats-row">
        <div className="card stat-card">
          <span className="stat-label">Active Debt</span>
          <h3>0.00 ETH</h3>
          <p className="subtext">Max Capacity: 2.50 ETH</p>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Health Factor</span>
          <h3 className="text-emerald">2.10 (Safe)</h3>
          <p className="subtext">Liquidation at &lt; 1.10</p>
        </div>
        <div className="card stat-card">
          <span className="stat-label">Next Payment</span>
          <h3>--</h3>
          <p className="subtext">No upcoming dues</p>
        </div>
      </div>

      <div className="two-column-layout">
        <div className="card form-card">
          <h3><PlusCircle size={20} /> Request a Micro-Loan</h3>
          <form onSubmit={handleRequestLoan}>
            <div className="input-group">
              <label>Amount (ETH)</label>
              <input 
                type="number" 
                step="0.01"
                placeholder="0.1" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Duration (Days)</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="7">7 Days (3% APR)</option>
                <option value="15">15 Days (5% APR)</option>
                <option value="30">30 Days (8% APR)</option>
              </select>
            </div>
            <button className="primary-btn borrower-btn" disabled={loading}>
              {loading ? 'Confirming in Wallet...' : 'Submit Request'}
            </button>
          </form>
        </div>

        <div className="card table-card">
          <h3>Active Borrowed Loans</h3>
          <p className="empty-state">No active loans found. Create a request to get started.</p>
        </div>
      </div>
    </div>
  );
}