// Smart Contract ABIs for IndoBlockCloud Platform

export const INDO_TOKEN_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
] as const;

export const NODE_MARKETPLACE_ABI = [
  "function createNode(string memory nodeId, uint256 pricePerHour, string memory specs) external",
  "function rentNode(string memory nodeId, uint256 duration) external payable",
  "function releasePayment(string memory orderId) external",
  "function withdrawEarnings() external",
  "function getNodeInfo(string memory nodeId) view returns (tuple(address provider, uint256 pricePerHour, bool available, uint256 reputation))",
  "function getUserBalance(address user) view returns (uint256)",
  "function getActiveRentals(address user) view returns (string[] memory)",
  "event NodeCreated(string indexed nodeId, address indexed provider, uint256 pricePerHour)",
  "event NodeRented(string indexed nodeId, address indexed renter, uint256 duration, uint256 totalCost)",
  "event PaymentReleased(string indexed orderId, address indexed provider, uint256 amount)",
  "event EarningsWithdrawn(address indexed provider, uint256 amount)"
] as const;

export const STORAGE_ESCROW_ABI = [
  "function createStorageOrder(string memory fileHash, uint256 storageDuration, address provider) external payable",
  "function confirmStorage(string memory orderId, string memory ipfsCid) external",
  "function releaseStoragePayment(string memory orderId) external",
  "function disputeOrder(string memory orderId) external",
  "function getStorageOrder(string memory orderId) view returns (tuple(address customer, address provider, uint256 amount, uint256 duration, string ipfsCid, uint8 status))",
  "event StorageOrderCreated(string indexed orderId, address indexed customer, address indexed provider, uint256 amount)",
  "event StorageConfirmed(string indexed orderId, string ipfsCid)",
  "event StoragePaymentReleased(string indexed orderId, address indexed provider, uint256 amount)"
] as const;

export const STAKING_CONTRACT_ABI = [
  "function stake(uint256 amount) external",
  "function unstake(uint256 amount) external",
  "function claimRewards() external",
  "function getStakedBalance(address user) view returns (uint256)",
  "function getPendingRewards(address user) view returns (uint256)",
  "function getStakingInfo() view returns (tuple(uint256 totalStaked, uint256 rewardRate, uint256 minStakeAmount))",
  "event Staked(address indexed user, uint256 amount)",
  "event Unstaked(address indexed user, uint256 amount)",
  "event RewardsClaimed(address indexed user, uint256 amount)"
] as const;

// Contract addresses (replace with actual deployed addresses)
export const CONTRACT_ADDRESSES = {
  INDO_TOKEN: "0x0000000000000000000000000000000000000001", // Replace with actual INDO token address
  NODE_MARKETPLACE: "0x0000000000000000000000000000000000000002", // Replace with actual marketplace address
  STORAGE_ESCROW: "0x0000000000000000000000000000000000000003", // Replace with actual storage escrow address
  STAKING_CONTRACT: "0x0000000000000000000000000000000000000004", // Replace with actual staking address
} as const;

// Supported networks
export const SUPPORTED_NETWORKS = {
  ETHEREUM_MAINNET: {
    chainId: 1,
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://etherscan.io"
  },
  POLYGON: {
    chainId: 137,
    name: "Polygon",
    rpcUrl: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com"
  },
  BSC: {
    chainId: 56,
    name: "Binance Smart Chain",
    rpcUrl: "https://bsc-dataseed.binance.org",
    blockExplorer: "https://bscscan.com"
  }
} as const;