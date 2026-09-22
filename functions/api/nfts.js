const TPS_NFT_CONTRACT = "0x38b77e639f1db707949937a1aab000b6a603ac30";

export async function onRequestGet(context) {
    const { request, env } = context;

    const url = new URL(request.url);
    const owner = url.searchParams.get("owner");

    // Validate the supplied wallet address.
    if (!owner || !/^0x[a-fA-F0-9]{40}$/.test(owner)) {
        return Response.json(
            { error: "Invalid wallet address." },
            { status: 400 }
        );
    }

    try {
        const alchemyUrl = new URL(
            `https://polygon-mainnet.g.alchemy.com/nft/v3/${env.ALCHEMY_API_KEY}/getNFTsForOwner`
        );

        alchemyUrl.searchParams.set("owner", owner);
        alchemyUrl.searchParams.append("contractAddresses[]", TPS_NFT_CONTRACT);
        alchemyUrl.searchParams.set("withMetadata", "true");
        alchemyUrl.searchParams.set("pageSize", "100");

        const response = await fetch(alchemyUrl);

        if (!response.ok) {
            return Response.json(
                { error: "Unable to retrieve NFT collection." },
                { status: 502 }
            );
        }

        const data = await response.json();

        const nfts = (data.ownedNfts ?? []).map((nft) => ({
            name: nft.name?.replace(/^TPS\s*/i, "") ?? null,
            image: nft.image?.cachedUrl ?? null
        }));

        return Response.json({ nfts });

    } catch (error) {
        return Response.json(
            { error: "Unable to retrieve NFT collection." },
            { status: 500 }
        );
    }
}