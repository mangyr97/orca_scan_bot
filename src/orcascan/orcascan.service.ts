import { IOrcascan, creteWalletOptions } from "./orcascan.interface";
import { IOrcaRequest } from "./request/request.interface";
import { OrcaRequest } from "./request/request.service";
import { IWallet } from "./wallet/wallet.interface";

export class Orcascan implements IOrcascan {
    private request: IOrcaRequest
    constructor(baseUrl: string) {
        this.request = new OrcaRequest(baseUrl)
    }
    async createWallet(options: creteWalletOptions): Promise<IWallet|undefined> {
        try {
            const response = await this.request.post('/wallets', options);
            if (response.status === 201) {
                const wallet = response.data
                return wallet
            } else {
                console.log(`Error response status: ${response.status}, ${response.statusText}`);
                return undefined
            }
        } catch (error) {
            console.log(error);
            return undefined
        }
        
    }
    async getWalletById(id: string): Promise<IWallet|undefined> {
        throw new Error("Method not implemented.");
    }
    async getWalletByTgId(id: string): Promise<IWallet|undefined> {
        throw new Error("Method not implemented.");
    }
    async getAllWallets(): Promise<IWallet[]|undefined> {
        throw new Error("Method not implemented.");
    }
    async getBalance(address: string): Promise<string|undefined> {
        try {
            const response = await this.request.post('/balances', {address});
            if (response.status === 201) {
                const balance = response.data.balance
                return balance
            } else {
                console.log(`Error response status: ${response.status}, ${response.statusText}`);
                return undefined
            }
        } catch (error) {
            console.log(error);
            return undefined
        }
        
    }
}