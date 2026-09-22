const TPS_NFT_CONTRACT = "0x38b77e639f1db707949937a1aab000b6a603ac30";

function getAttribute(attributes, name) {
    return attributes.find(
        attribute =>
            attribute.trait_type?.toLowerCase() === name.toLowerCase()
    )?.value ?? null;
}

function formatNft(nft) {
    const attributes = nft.raw?.metadata?.attributes ?? [];

    return {
        name: nft.name?.replace(/^TPS\s*/i, "") ?? null,
        image: nft.image?.cachedUrl ?? null,
        model: getAttribute(attributes, "Model"),
        rarity: getAttribute(attributes, "Rarity"),
        class: getAttribute(attributes, "Class"),
        era: getAttribute(attributes, "Era"),
        background: getAttribute(attributes, "Background"),
        colour: getAttribute(attributes, "Colour"),
        acceleration: getAttribute(attributes, "Acceleration"),
        topSpeed: getAttribute(attributes, "Speed"),
        handling: getAttribute(attributes, "Handling"),
        prestige: getAttribute(attributes, "Prestige"),
        booster: getAttribute(attributes, "Booster")
    };
}

export async function onRequestGet(context) {
    const { request, env } = context;

    const url = new URL(request.url);
    const owner = url.searchParams.get("owner");
    const showcase = url.searchParams.get("showcase");

    try {
        // RANDOM SHOWCASE MODE
        if (showcase === "random") {
            const showcaseNfts = [];
            const attemptedNumbers = new Set();

            const isCompleteNft = (nft) =>
                nft.name &&
                nft.image &&
                nft.class &&
                nft.era &&
                nft.acceleration !== null &&
                nft.topSpeed !== null &&
                nft.handling !== null &&
                nft.prestige !== null;

            // Try up to 5 batches to collect 25 complete NFTs.
            for (let batch = 0; batch < 5 && showcaseNfts.length < 25; batch++) {
                const selectedNumbers = [];

                while (selectedNumbers.length < 25) {
                    const number = Math.floor(Math.random() * 1000);

                    if (!attemptedNumbers.has(number)) {
                        attemptedNumbers.add(number);
                        selectedNumbers.push(number);
                    }
                }

                const tokenIds = selectedNumbers.map(number =>
                    String(number + 1)
                );

                const alchemyUrl = new URL(
                    `https://polygon-mainnet.g.alchemy.com/nft/v3/${env.ALCHEMY_API_KEY}/getNFTMetadataBatch`
                );

                const response = await fetch(alchemyUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        tokens: tokenIds.map(tokenId => ({
                            contractAddress: TPS_NFT_CONTRACT,
                            tokenId
                        })),
                        refreshCache: true
                    })
                });

                if (!response.ok) {
                    continue;
                }

                const data = await response.json();

                const validNfts = (data.nfts ?? [])
                    .map(formatNft)
                    .filter(isCompleteNft);

                showcaseNfts.push(...validNfts);
            }

            return Response.json({
                nfts: showcaseNfts.slice(0, 25)
            });
        }

        // WALLET MODE
        if (!owner || !/^0x[a-fA-F0-9]{40}$/.test(owner)) {
            return Response.json(
                { error: "Invalid wallet address." },
                { status: 400 }
            );
        }

        const alchemyUrl = new URL(
            `https://polygon-mainnet.g.alchemy.com/nft/v3/${env.ALCHEMY_API_KEY}/getNFTsForOwner`
        );

        alchemyUrl.searchParams.set("owner", owner);
        alchemyUrl.searchParams.append(
            "contractAddresses[]",
            TPS_NFT_CONTRACT
        );
        alchemyUrl.searchParams.set("withMetadata", "true");
        alchemyUrl.searchParams.set("refreshCache", "true");
        alchemyUrl.searchParams.set("pageSize", "100");

        const response = await fetch(alchemyUrl);

        if (!response.ok) {
            return Response.json(
                { error: "Unable to retrieve NFT collection." },
                { status: 502 }
            );
        }

        const data = await response.json();

        const nfts = (data.ownedNfts ?? [])
            .map(formatNft)
            .sort((a, b) => {
                const aNumber = parseInt(a.name?.replace("#", ""), 10);
                const bNumber = parseInt(b.name?.replace("#", ""), 10);
                return aNumber - bNumber;
            });

        return Response.json({ nfts });

    } catch (error) {
        return Response.json(
            { error: "Unable to retrieve NFT collection." },
            { status: 500 }
        );
    }
}