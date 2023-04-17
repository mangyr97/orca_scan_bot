import { IWallet } from "../orcascan/wallet/wallet.interface";
import { Context } from "telegraf";

export interface SessionData {
    botLike: boolean
    wallets?: IWallet[]
}
export interface IBotContext extends Context {
    session: SessionData
}