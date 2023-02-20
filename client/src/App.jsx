import React, { useEffect, useRef, useMemo, useState } from "react"
import "./App.css"
import Web3 from "web3"
import axios from "axios"
import trade20 from "./contracts/Trade.json"

function App() {
    const [accounts, setAccounts] = useState([])
    const [tokens, setTokens] = useState([])
    const [contract, setContract] = useState()
    const web3 = useMemo(() => new Web3(window.ethereum), [])
    const abi = useMemo(
        () => [
            {
                inputs: [
                    {
                        internalType: "address",
                        name: "spender",
                        type: "address"
                    },
                    {
                        internalType: "uint256",
                        name: "amount",
                        type: "uint256"
                    }
                ],
                name: "approve",
                outputs: [
                    {
                        internalType: "bool",
                        name: "",
                        type: "bool"
                    }
                ],
                stateMutability: "nonpayable",
                type: "function"
            }
        ],
        []
    )
    const receiver = useRef("")
    const amount = useRef(NaN)
    const token = useRef({})

    useEffect(() => {
        ;(async () => {
            window.ethereum.on("accountsChanged", async () => {
                const accounts = await web3.eth.getAccounts()
                setAccounts(accounts)
            })
            const accounts = await web3.eth.requestAccounts()
            const contract = new web3.eth.Contract(
                trade20.abi,
                trade20.networks["5"].address
            )
            setAccounts(accounts)
            setContract(contract)
        })()
    }, [])

    useEffect(() => {
        if (accounts.length === 0) return
        ;(async () => {
            const tokens = await axios.get(
                "http://localhost:3000/api/erc20/tokens",
                {
                    params: { walletAddress: accounts[0] }
                }
            )
            console.log(tokens)
            setTokens(tokens.data)
        })()
    }, [accounts])

    const amountHandle = (e) => {
        amount.current = e.target.valueAsNumber
    }

    const receiverHandle = (e) => {
        receiver.current = e.target.value
    }

    const tokenHandle = (e) => {
        token.current = tokens[Number(e.target.value)]
    }

    const checkBalance = async () => {
        let bal = await contract.methods
            .getBalance(token.current.address, accounts[0])
            .call()
        bal /= 10 ** 18
        console.log("balance", bal)
        if (bal < amount.current) {
            alert("Low Balance!")
            return false
        } else {
            return true
        }
    }

    const transfer = () => {
        const payment = web3.utils.toWei(amount.current.toString(), "ether")
        contract.methods
            .trade(token.current.address, receiver.current, payment)
            .send({ from: accounts[0] })
            .on("receipt", (rec) => {
                console.log(rec)
                alert("trade sucessful!")
            })
    }

    const trade = async () => {
        let allowance = await contract.methods
            .getAllowance(token.current.address, accounts[0])
            .call()
        allowance /= 10 ** 18
        console.log("allowance", allowance)
        if (allowance < amount.current) {
            alert("Low Allowance!")
            const contract = new web3.eth.Contract(abi, token.current.address)
            contract.methods
                .approve(
                    trade20.networks["5"].address,
                    web3.utils.toWei(amount.current.toString(), "ether")
                )
                .send({ from: accounts[0] })
                .on("receipt", (rec) => {
                    console.log(rec)
                    transfer()
                })
        } else {
            transfer()
        }
    }

    const transact = async (e) => {
        e.preventDefault()
        if (await checkBalance()) {
            trade()
        }
    }

    return (
        <div id="App">
            <h1>{accounts[0]}</h1>
            <form onSubmit={transact}>
                <div id="token">
                    <label htmlFor="tkn">Token</label>
                    {tokens.length > 0 && (
                        <select name="tkn" id="tkn" onChange={tokenHandle}>
                            <option disabled selected>
                                Choose Token
                            </option>
                            {tokens.map((tkn, index) => (
                                <option value={index} key={tkn.address}>
                                    {tkn.symbol}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div id="payment">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        name="amount"
                        id="amount"
                        onChange={amountHandle}
                        placeholder="qty of tokens to be paid"
                    />
                </div>
                <div id="receiver">
                    <label htmlFor="recipient">Recipient</label>
                    <input
                        type="text"
                        name="recipient"
                        id="recipient"
                        onChange={receiverHandle}
                        placeholder="receiver's address"
                    />
                </div>
                <input className="transfer" type="submit" value="Transfer" />
            </form>
        </div>
    )
}

export default App
