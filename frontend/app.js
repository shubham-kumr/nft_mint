// Add the Pinata JWT here
const pinataJWT = "<Your_Pinata_JWT>"; // Replace with your actual Pinata JWT

const connectWalletBtn = document.getElementById("connectWalletBtn");
const mintForm = document.getElementById("mintForm");

let userAccount;

// Connect Wallet
connectWalletBtn.addEventListener("click", async () => {
  if (typeof window.ethereum !== "undefined") {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    userAccount = accounts[0];
    connectWalletBtn.textContent = "Wallet Connected";
    connectWalletBtn.disabled = true;
  } else {
    alert("MetaMask is not installed!");
  }
});

// Handle Image Upload and Mint NFT
mintForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!userAccount) {
    alert("Please connect your wallet first!");
    return;
  }

  const nftName = mintForm.querySelector("input[type='text']:nth-child(1)").value;
  const nftDescription = mintForm.querySelector("input[type='text']:nth-child(2)").value;
  const nftImage = document.getElementById("imageInput").files[0];

  if (!nftName || !nftDescription || !nftImage) {
    alert("Please fill all fields!");
    return;
  }

  // Upload to IPFS using Pinata JWT
  const formData = new FormData();
  formData.append("file", nftImage);

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${pinataJWT}`, // Use JWT for authentication
    },
    body: formData,
  });

  const data = await res.json();
  if (data.IpfsHash) {
    const ipfsImageUrl = `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;

    // Create metadata for the NFT
    const metadata = {
      name: nftName,
      description: nftDescription,
      image: ipfsImageUrl,
    };

    // Upload metadata to IPFS
    const metadataRes = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${pinataJWT}`, // Use JWT for authentication
        "Content-Type": "application/json", // Specify content type
      },
      body: JSON.stringify(metadata),
    });

    const metadataData = await metadataRes.json();
    if (metadataData.IpfsHash) {
      const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadataData.IpfsHash}`;

      // Mint the NFT
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(<Your_Contract_ABI>, "<Your_Contract_Address>");

      contract.methods
        .mintNFT(userAccount, metadataUrl)
        .send({ from: userAccount })
        .on("transactionHash", (hash) => {
          console.log("Minting transaction hash:", hash);
        })
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log("NFT Minted:", receipt);
          alert("NFT minted successfully! Check on OpenSea.");
        })
        .on("error", (error) => {
          console.error("Minting error:", error);
          alert("Failed to mint NFT.");
        });
    } else {
      alert("Failed to upload metadata to IPFS.");
    }
  } else {
    alert("Failed to upload image to IPFS.");
  }
});
