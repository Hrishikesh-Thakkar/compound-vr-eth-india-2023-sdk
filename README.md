# Airstack On-Chain Friends SDK (by Compound VR EthIndia 2023)

## Description

This repository contains a set of scripts and utilities for fetching, processing, and visualizing blockchain-related data. The primary focus is on fetching on-chain graph data, calculating scores for users, transforming data for visualization, and fetching details about NFTs (Non-Fungible Tokens) and POAP (Proof of Attendance Protocol) events.

## Getting Started

To use this project, follow the steps below:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Hrishikesh-Thakkar/compound-vr-eth-india-2023-sdk.git
   cd compound-vr-eth-india-2023-sdk

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up your environment variables:**

    ***Create a .env file in the root of the project and add your Airstack API key:***

    ```
    AIRSTACK_API_KEY=your-api-key
    IDENTITY_OR_ADDRESS=your-identity-or-address
    ```

4. **Get data in .json files:**
    1. On ChainGraph Data
    2. Transformed on chain graph data for visualization graph
    3. Token Nft data by tokenAddress and tokenId
    4. POAP event data by eventId and blockchain

5. **Run the following command to see above data for given identity in json files:**
      ```bash
      npm run fetch
      ```

## Note
**Above command will fetch data for given identity and store it in json files in root folder.**
- `onChainGraphUsers.json`: On ChainGraph Data for given identity
- `onChainGraphWithScore.json`: On ChainGraph Data with score for given identity
- `visualisationData.json`: Transformed on chain graph data for visualization graph for given identity
- `nft.json`: Token Nft data by tokenAddress, tokenId and blockchain
- `poapEvent.json`: POAP event data by eventId and blockchain