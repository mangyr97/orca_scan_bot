import { IOrcascan, creteWalletOptions } from "./orcascan.interface";
import { IOrcaRequest } from "./request/request.interface";
import { OrcaRequest } from "./request/request.service";
import { IWallet } from "./wallet/wallet.interface";

export class Orcascan implements IOrcascan {
    private request: IOrcaRequest
    constructor(baseUrl: string) {
        this.request = new OrcaRequest(baseUrl)
    }
    async createWallet(options: creteWalletOptions): Promise<IWallet> {
        const response = await this.request.post('/wallets', options);
        if (response.status === 201) {
            const wallet = response.data
            return wallet
        } else {
            throw new Error(`Error response status: ${response.status}, ${response.statusText}`);
        }
    }
    async getWalletById(id: string): Promise<IWallet> {
        throw new Error("Method not implemented.");
    }
    async getWalletByTgId(id: string): Promise<IWallet> {
        throw new Error("Method not implemented.");
    }
    async getAllWallets(): Promise<IWallet[]> {
        throw new Error("Method not implemented.");
    }
    async getBalance(address: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
}