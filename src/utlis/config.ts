import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
export const ETH_RPC = process.env.ETH_RPC
export const BOT_TOKEN = process.env.BOT_TOKEN