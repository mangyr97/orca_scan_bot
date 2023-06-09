import { IWallet } from "./wallet/wallet.interface";

export interface creteWalletOptions {
    address:string,
    telegram_user_id: string
}
export interface IOrcascan {
    createWallet(options: creteWalletOptions): Promise<IWallet|undefined>;
    getWalletById(id: string): Promise<IWallet|undefined>;
    getWalletsByTgId(id: string): Promise<IWallet[]|undefined>;
    getAllWallets(): Promise<IWallet[]|undefined>;
    getBalance(address: string): Promise<any|undefined>;
}