import { getAlchemy } from "./alchemy.js"

const getMeta = async (tkns, balances) => {
    const alchemy = getAlchemy()
    for (const tkn of balances) {
        if (
            tkn.tokenBalance !==
            "0x0000000000000000000000000000000000000000000000000000000000000000"
        ) {
            const meta = await alchemy.core.getTokenMetadata(
                tkn.contractAddress
            )
            tkns.push({
                name: meta.name,
                symbol: meta.symbol,
                address: tkn.contractAddress
            })
        }
    }
}

export const filterTokens = async (balances) => {
    const tkns = []
    await getMeta(tkns, balances)
    return tkns
}
