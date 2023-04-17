import { IWallet } from "./wallet/wallet.interface";

export interface creteWalletOptions {
    address:string,
    telegram_user_id: string
}
export interface IOrcascan {
    createWallet(options: creteWalletOptions): Promise<IWallet|undefined>;
    getWalletById(id: string): Promise<IWallet|undefined>;
    getWalletByTgId(id: string): Promise<IWallet|undefined>;
    getAllWallets(): Promise<IWallet[]|undefined>;
    getBalance(address: string): Promise<string|undefined>;
}