import { EthereumProvider, EthereumOptions } from "../index";
import { ETH_RPC } from "../../utlis/config";

describe('Ethereum provider test', () => {
    const options: EthereumOptions = {
        url:ETH_RPC
    };
    const contract = '0x0D8775F648430679A709E98d2b0Cb6250d2887EF';
    const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    const provider = new EthereumProvider(options);
    test('getBalanceByAddress()', async () => {
        const balance = await provider.getBalanceByAddress(address);
        expect(balance.gt(0)).toBe(true);
    });
    test('getTokenBalanceByAddress()', async () => {
        const balance = await provider.getTokenBalanceByAddress(address, contract);
        expect(balance.gt(0)).toBe(true);
    });
    test('getTokenDecimals()', async () => {
        const balance = await provider.getTokenBalanceByAddress(address, contract);
        const decimals = await provider.getTokenDecimals(contract);
        const humanBalance = provider.fromNativeNumber(balance,decimals);
        expect(humanBalance.gt(0)).toBe(true);
    });
    test('addressFromMnemonic()', async () => {
        const address = await provider.addressFromMnemonic('equal flame day angle bone village salmon area eye toast brown again adjust broom dish wolf fluid online whale suffer antenna crawl price rent');
        expect(address).toBe('0x7392862e798a46e4066b336be9fd48e19fae8207');
    });
});