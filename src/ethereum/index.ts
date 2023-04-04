import axios, {AxiosInstance} from 'axios';
import BigNumber from "bignumber.js";
import keccak256 from 'keccak256';
import * as bip39 from 'bip39';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { pubToAddress } from 'ethereumjs-util';

export interface EthereumOptions {
    url: string;
}
export class EthereumProvider {
    protected readonly nodeUrl: string;
    protected readonly decimals: number;
    private api: AxiosInstance;
    private bip32: any;
    constructor(options:EthereumOptions) {
        this.nodeUrl = options.url;
        this.decimals = 18; // ethereum decimals
        this.api = axios.create({
            baseURL: this.nodeUrl,
            headers: {
                'Content-Type': 'application/json' 
            }
        });
        this.bip32 = BIP32Factory(ecc);
    }
    async getBalanceByAddress(address: string): Promise<BigNumber> {
        const body = {
            jsonrpc: "2.0",
            method: "eth_getBalance",
            params: [address, "latest"],
            id: this.getRequestId()
        };
        const response = await this.postRequest(body);
        if (response) {
            return this.fromHex(response.result)
        }
    }
    async getTokenBalanceByAddress(address: string, contract : string): Promise<BigNumber> {
        const call = this.prepareCall(address,'balanceOf(address)')
        const body = {
            jsonrpc: "2.0",
            method: "eth_call",
            params: [{"data":call,"to":contract}, "latest"],
            id: this.getRequestId()
        };
        const response = await this.postRequest(body);
        return this.fromHex(response.result)
    }
    prepareCall(address: string, method: string) {
        const preMethod = `0x${keccak256(method).toString('hex')}`.slice(0,10);
        const preAddress = address.startsWith('0x')? address.slice(2): address
        const zeros = '000000000000000000000000'
        return preMethod+zeros+preAddress
    }
    fromHex(n: string): BigNumber {
        return new BigNumber(n,16)
    }
    fromNativeNumber(n: string | number | BigNumber, decimals?: number): BigNumber {
        return new BigNumber(n).shiftedBy(decimals? -decimals:-this.getDecimals())
    }
    toNativeNumber(n: string | number | BigNumber, decimals?: number): BigNumber {
        return new BigNumber(n).shiftedBy(decimals? decimals:this.getDecimals())
    }
    getDecimals(): number {
        return this.decimals
    }
    async getTokenDecimals(contract: string): Promise<number> {
        const method = 'decimals()'
        const call = `0x${keccak256(method).toString('hex')}`
        const body = {
            jsonrpc: "2.0",
            method: "eth_call",
            params: [{"data":call,"to":contract}, "latest"],
            id: this.getRequestId()
        };
        const response = await this.postRequest(body);
        return this.fromHex(response.result).toNumber()
    }
    addressFromMnemonic(mnemonic: string): string {
        const phrase = mnemonic ? mnemonic : bip39.generateMnemonic();
        const seedBuffer = bip39.mnemonicToSeedSync(phrase);
        const node = this.bip32.fromSeed(seedBuffer);
        const account0 = node.derivePath("m/44'/60'/0'");
        const address = `0x${pubToAddress(account0.derivePath('0/0').publicKey, true).toString('hex')}`
        return address
    }
    async postRequest(body) {
        try {
            const response = await this.api.post(
                this.nodeUrl,
                body
            )
            return response.data
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    }
    private getRequestId() {
        return new Date().getTime()
    }
}

