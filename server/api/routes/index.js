import express from "express"

// import { walletRouter } from "./walletRoutes.js"
// import { nftRouter } from "./nftRoutes.js"
// import { userRouter } from "./userRoutes.js"
// import { swapsRouter } from "./swapsRoutes.js"
import { erc20Router } from "./erc20Routes.js"

const apiRouter = express.Router()

// apiRouter.use("/nfts", nftRouter)
// apiRouter.use("/wallets", walletRouter)
// apiRouter.use("/users", userRouter)
// apiRouter.use("/swaps", swapsRouter)
apiRouter.use("/erc20", erc20Router)

export default apiRouter
