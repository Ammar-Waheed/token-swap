import { Network, Alchemy } from "alchemy-sdk";

export function getAlchemy() {
    // Optional Config object, but defaults to demo api-key and eth-mainnet.
    const settings = {
        apiKey: process.env.ALCHEMY_KEY_GOERLI, // Replace with your Alchemy API Key.
        network: Network.ETH_GOERLI, // Replace with your network.
    };
  
    return new Alchemy(settings);    
}
