import { ethers } from "ethers";
import hre from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  console.log("Deploying MicroLoan contract to Sepolia...");

  const rpcUrl = process.env.SEPOLIA_RPC_URL;
  const privateKey = process.env.PRIVATE_KEY;

  if (!rpcUrl || !privateKey) {
    throw new Error("Missing SEPOLIA_RPC_URL or PRIVATE_KEY in .env file");
  }

  // Set up provider and wallet directly using Ethers v6
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  // Read compiled contract artifact from Hardhat
  const artifact = await hre.artifacts.readArtifact("MicroLoan");

  // Create contract factory and deploy
  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const microLoan = await factory.deploy();

  console.log("Transaction sent! Waiting for block confirmation...");
  await microLoan.waitForDeployment();

  const address = await microLoan.getAddress();
  console.log(`\nSuccess! MicroLoan deployed to Sepolia at address: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});