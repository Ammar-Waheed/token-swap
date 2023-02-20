import { getAlchemy } from "../../utils/alchemy.js"
import { filterTokens } from "../../utils/erc20Helpers.js"

const list_all_erc20_tokens = async (req, res) => {
    const alchemy = getAlchemy()
    try {
        const response = await alchemy.core.getTokenBalances(
            req.query.walletAddress,
            req.query.tknAddresses
        )
        const tkns = await filterTokens(response.tokenBalances)
        res.send(tkns)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
}

export default { list_all_erc20_tokens }
