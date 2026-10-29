# 🌸 MicroLoan dApp

A decentralized micro-lending platform built on Ethereum (Sepolia testnet). This dApp enables transparent, peer-to-peer micro-loans without traditional financial intermediaries, using smart contracts for loan requests, funding, withdrawals, repayments, and default tracking.

---

## ✨ Features

- **Borrower Portal:** Request loans by specifying principal amount, repayment terms, and due date. Withdraw funds once fully funded.
- **Lender Hub:** Discover open loan requests, fund loans directly, and track repayments.
- **Automated Escrow:** Smart contract holds funds securely and manages lifecycle transitions safely.
- **Default Management:** Built-in verification logic allowing lenders to flag overdue defaulted loans.
- **Web3 Integration:** Full MetaMask wallet integration with real-time feedback and state syncing.

---

## 🛠️ Tech Stack

### **Smart Contracts**
- **Language:** Solidity (`^0.8.20`)
- **Framework:** Hardhat
- **Network:** Sepolia Testnet
- **Deployed Contract Address:** `0x5eA92A5a78344C1A66827DAcB882D4AFd38ABD6c`

### **Frontend**
- **Framework:** React + Vite
- **Web3 Library:** Ethers.js v6
- **Styling:** Custom CSS with modern UI components and CSS animations

---

## 📁 Repository Structure

```text
micro-loan-dapp/
├── contracts/               # Hardhat smart contract development workspace
│   ├── contracts/          # Solidity smart contracts
│   ├── scripts/            # Deployment and setup scripts
│   └── hardhat.config.ts   # Hardhat deployment configuration
└── frontend/               # React + Vite frontend interface
    ├── src/
    │   ├── components/     # Borrower Dashboard, Lender Hub, Navbar, etc.
    │   ├── MicroloanABI.json # Smart contract Application Binary Interface
    │   └── config.js       # Contract configuration settings
    └── package.json
```
## 🚀 Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MetaMask Wallet](https://metamask.io/) browser extension connected to the **Sepolia Testnet**
- Sepolia Test ETH (obtainable via free faucets such as [Alchemy Sepolia Faucet](https://www.sepoliafaucet.com/))

---

## ⚙️ Installation & Setup

### **1. Clone the Repository**
```bash
git clone [https://github.com/SimranOsta/micro-loan-dapp.git](https://github.com/SimranOsta/micro-loan-dapp.git)
cd micro-loan-dapp
```
### **2. Setup & Compile Smart Contracts**
Navigate to the `contracts` directory, install the required dependencies, and compile the Hardhat contracts:

```bash
cd contracts
npm install
npx hardhat compile
```
### **3. Setup & Run Frontend**

```bash
cd ../frontend
npm install
npm run dev
```
Open http://localhost:5173 in your browser to interact with the application!

## 📜 Smart Contract Core Methods

| Method | Access | Description |
| :--- | :--- | :--- |
| `requestLoan(principal, repayment, dueDate)` | Borrower | Creates a new loan request. |
| `fund(loanId)` | Lender | Funds an open loan request with ETH. |
| `withdrawToBorrower(loanId)` | Borrower | Releases funded loan amount to borrower. |
| `repay(loanId)` | Borrower | Repays total owed balance back to lender. |
| `markDefault(loanId)` | Lender | Flags loan as defaulted if past due date. |

## 📝 License
Distributed under the MIT License. See LICENSE for more information.
