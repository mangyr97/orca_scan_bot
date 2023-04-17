import { IWallet } from "./wallet/wallet.interface";

export interface creteWalletOptions {
    address:string,
    telegram_user_id: string
}
export interface IOrcascan {
    createWallet(options: creteWalletOptions): Promise<IWallet>;
    getWalletById(id: string): Promise<IWallet>;
    getWalletByTgId(id: string): Promise<IWallet>;
    getAllWallets(): Promise<IWallet[]>;
    getBalance(address: string): Promise<string>;
}