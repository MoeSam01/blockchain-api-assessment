const { ethers } = require("ethers");

async function getContractData() {
  try {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

    const contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)",
        "function totalSupply() view returns (uint256)"
      ],
      provider
    );

    const [network, blockNumber, name, symbol, decimals, totalSupply] =
      await Promise.all([
        provider.getNetwork(),
        provider.getBlockNumber(),
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply()
      ]);

    const result = {
      chainId: network.chainId.toString(),
      blockNumber: blockNumber.toString(),
      contractAddress: process.env.CONTRACT_ADDRESS,
      name,
      symbol,
      decimals: decimals.toString(),
      totalSupply: ethers.formatUnits(totalSupply, decimals)
    };

    console.log("[MohammadAlsammanApiTest] Contract data:", result);

    return result;
  } catch (error) {
    console.error("[MohammadAlsammanApiTest] Error:", error.message);
    throw error;
  }
}

module.exports = { getContractData };