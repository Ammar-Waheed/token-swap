const assert = require("assert")
const axios = require("axios")
const { it } = require("mocha")

describe("new user", () => {
    it("should register a new user and then get check if it exists in the DB", async () => {
        const address = "0x79f553dcE43134F45ce87977f1a09Ad9B9A4D3Ea"
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            address,
            timestamp: "1671618256"
        })

        let reqOptions = {
            url: "http://localhost:4000/api/users/:new-user",
            method: "POST",
            headers: headersList,
            data: bodyContent
        }
        await axios.request(reqOptions)
        let HeadersList = {
            "Accept": "*/*",
        }

        let ReqOptions = {
            url: `http://localhost:4000/api/users/:user?address=${address}`,
            method: "GET",
            headers: HeadersList
        }

        let response = await axios.request(ReqOptions)
        console.log(response)
        assert.equal(response.status, 200)
    })
})

describe("new swap", () => {
    it("should insert data for a new swap", async () => {
        let headersList = {
            Accept: "*/*",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            meta: "metadata",
            i_address: "0x00A7e65D40f030efeB90FBceDF385fbba24a70dE",
            a_address: "0x79f553dcE43134F45ce87977f1a09Ad9B9A4D3Ea"
        })

        let reqOptions = {
            url: "http://localhost:4000/api/swaps/:new-swap",
            method: "POST",
            headers: headersList,
            data: bodyContent
        }

        let response = await axios.request(reqOptions)
        assert.equal(response.status, 200)
    })
})

describe("update swap", () => {
    it("update data for a new swap", async () => {
        let headersList = {
            Accept: "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Content-Type": "application/json"
        }

        let bodyContent = JSON.stringify({
            status: 2,
            meta: "metadata"
        })

        let reqOptions = {
            url: "http://localhost:4000/api/swaps/:status",
            method: "PATCH",
            headers: headersList,
            data: bodyContent
        }

        let response = await axios.request(reqOptions)
        assert.equal(response.status, 200)
    })
})
