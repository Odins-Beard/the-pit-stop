// Add a new image to assets/images, then add its number here.
// The order below is the order shown in the carousel.
const TPS_NFT_CONTRACT = "0x38b77e639f1db707949937a1aab000b6a603ac30";
const TPS_OG_CONTRACT = "0x4a999da8e93b8f04ef58c16c50e2bbd2da57dae8";

const USE_RANDOM_SHOWCASE = true;

const collectionCards = [
    "0",
    "88",
    "111",
    "234",
    "395",
    "432",
    "581",
    "610",
    "727",
    "732",
    "736",
    "764",
    "1013",
    "1068"
];

const walletInput = document.getElementById("wallet-address");
const walletStatus = document.getElementById("wallet-status");

async function loadRandomShowcase() {
    walletStatus.textContent = "Loading showcase...";
    document.getElementById("cards-refresh").disabled = true;

    try {
        const response = await fetch("/api/nfts?showcase=random");

        if (!response.ok) {
            throw new Error("Showcase request failed.");
        }

        const data = await response.json();

        if (!data.nfts || data.nfts.length === 0) {
            throw new Error("No showcase NFTs returned.");
        }

        renderGallery(data.nfts);

        walletStatus.textContent = "";
        document.getElementById("cards-refresh").disabled = false;

    } catch (error) {
        console.error("Unable to load random showcase:", error);
        walletStatus.textContent = "Unable to load showcase.";
    }
}

document.getElementById("cards-refresh").addEventListener("click", () => {
    if (USE_RANDOM_SHOWCASE && walletInput.value.trim() === "") {
        loadRandomShowcase();
    }
});

walletInput.addEventListener("input", async () => {
    const walletAddress = walletInput.value.trim();

    // Empty field = return to the normal showcase.
    if (walletAddress === "") {
        walletStatus.textContent = "";
        renderGallery(collectionCards.map(number => ({
            name: `#${number}`,
            image: imagePath(number)
        })));
        return;
    }

    // Wait until we have a complete Ethereum/Polygon wallet address.
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
        return;
    }

    walletStatus.textContent = "Looking for your TPS NFTs...";
    document.getElementById("cards-refresh").disabled = true;

    try {
        const response = await fetch(
            `/api/nfts?owner=${encodeURIComponent(walletAddress)}`
        );

        if (!response.ok) {
            throw new Error("NFT request failed.");
        }

        const data = await response.json();

        console.log("TPS NFTs:", data.nfts);

        if (data.nfts.length === 0) {
            walletStatus.textContent = "No TPS NFTs found in this wallet.";
            return;
        }

        walletStatus.textContent =
            `Found ${data.nfts.length} TPS NFT${data.nfts.length === 1 ? "" : "s"}. ` +
            `* Development In Progress *`;

        renderGallery(data.nfts);

    } catch (error) {
        console.error("Unable to retrieve TPS NFTs:", error);
    }
});

if (USE_RANDOM_SHOWCASE) {
    loadRandomShowcase();
} else {
    renderGallery(collectionCards.map(number => ({
        name: `#${number}`,
        image: imagePath(number)
    })));
    document.getElementById("cards-refresh").disabled = true;
}