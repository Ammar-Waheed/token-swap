import express from 'express'
import erc20Controller from '../controllers/erc20Controller.js'

export const erc20Router = express.Router()

erc20Router.get("/tokens",erc20Controller.list_all_erc20_tokens)