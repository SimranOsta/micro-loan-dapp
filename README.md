🌸 MicroLoan dAppA decentralized micro-lending platform built on Ethereum (Sepolia testnet). This dApp enables transparent, peer-to-peer micro-loans without traditional financial intermediaries, using smart contracts for loan requests, funding, withdrawals, repayments, and default tracking.✨ FeaturesBorrower Portal: Request loans by specifying principal amount, repayment terms, and due date. Withdraw funds once fully funded.Lender Hub: Discover open loan requests, fund loans directly, and track repayments.Automated Escrow: Smart contract holds funds securely and manages lifecycle transitions safely.Default Management: Built-in verification logic allowing lenders to flag overdue defaulted loans.Web3 Integration: Full MetaMask wallet integration with real-time feedback and state syncing.🛠️ Tech StackSmart ContractsLanguage: Solidity (^0.8.20)Framework: HardhatNetwork: Sepolia TestnetDeployed Contract Address: 0x5eA92A5a78344C1A66827DAcB882D4AFd38ABD6cFrontendFramework: React + ViteWeb3 Library: Ethers.js v6Styling: Custom CSS with modern UI components and CSS animations📁 Repository StructurePlaintextmicro-loan-dapp/
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
🚀 Getting StartedPrerequisitesNode.js (v18 or higher)MetaMask Wallet browser extension connected to the Sepolia TestnetSepolia Test ETH (obtainable via free faucets such as Alchemy Sepolia Faucet)⚙️ Installation & Setup1. Clone the RepositoryBashgit clone https://github.com/SimranOsta/micro-loan-dapp.git
cd micro-loan-dapp
2. Setup & Compile Smart ContractsBashcd contracts
npm install
npx hardhat compile
3. Setup & Run FrontendBashcd ../frontend
npm install
npm run dev
Open http://localhost:5173 in your browser to interact with the application!📜 Smart Contract Core MethodsMethodAccessDescriptionrequestLoan(principal, repayment, dueDate)BorrowerCreates a new loan request.fund(loanId)LenderFunds an open loan request with ETH.withdrawToBorrower(loanId)BorrowerReleases funded loan amount to borrower.repay(loanId)BorrowerRepays total owed balance back to lender.markDefault(loanId)LenderFlags loan as defaulted if past due date.📝 LicenseDistributed under the MIT License. See LICENSE for more information.
