# NFTVerse - NFT Mint

## 🛠️ Tech Stack

- Solidity + Hardhat
- Node.js + Express.js
- HTML, CSS, JavaScript
- Ethers.js
- IPFS (via Pinata or NFT.Storage)
- Polygon 

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/shubham-kumr/nftverse.git
cd nftverse
```

### 2. Install Dependencies

```bash
npm install 
```

### 3. Configure Environment

```bash
PRIVATE_KEY=your_wallet_private_key
RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/API-KEY
```

🔐 Important: Do not share your .env file publicly or commit it to version control.

### 4. Compile the Contract

```bash
npx hardhat compile
```

### 5. Deploy

```bash
npx hardhat run scripts/deploy.js --network [network-name]
```

---

## 🔗 URI Creation via Pinata

Follow these steps to create your NFT's metadata and upload it to IPFS via [Pinata](https://pinata.cloud):

### 1. Upload the Image
- Go to your Pinata dashboard
- Upload your NFT image (e.g., `my-nft.png`)
- Copy the resulting **CID** (Content Identifier)

### 2. Create Metadata JSON
Create a `metadata.json` file in your project (or generate it dynamically in your frontend), with a structure like:

```json
{
  "name": "Bootcamp Attendance NFT",
  "description": "This NFT certifies participation in the SHARP Blockchain Bootcamp",
  "image": "ipfs://<IMAGE_CID>",
  "attributes": [
    {
      "trait_type": "Attendee",
      "value": "Your Name"
    },
    {
      "trait_type": "Batch",
      "value": "April 2025"
    }
  ]
}
```

## 🌐 Tools & Links

- 🔧 [Remix IDE](https://remix.ethereum.org/)
- 🦊 [MetaMask](https://metamask.io/)
- 🔎 [PolygonScan](https://polygonscan.com/)
- 🖼️ [OpenSea ](https://opensea.io/)
- 📤 [Pinata](https://www.pinata.cloud/)
- 📦 [NFT.Storage](https://nft.storage/)

---

## 📸 Sample Output

> Once minted successfully, your NFT will appear on OpenSea  like this:
> `https://opensea.io/assets//<your_contract_address>/<token_id>`

---

---

> 🚀 Happy Building, and welcome to Web3!
