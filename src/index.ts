import { Telegraf, Markup, Context } from 'telegraf'
import { EthereumProvider, EthereumOptions } from "./ethereum";

import { ETH_RPC,BOT_TOKEN,ETH_ADDRESS } from "./utlis/config";
import { token_contracts } from "./utlis/contracts";

const walletaddress = ETH_ADDRESS;
const options: EthereumOptions = {
    url: ETH_RPC
};
const ethProvider = new EthereumProvider(options);

const bot = new Telegraf(BOT_TOKEN)
bot.use(async (ctx, next) => {
    console.log(ctx.from);
    console.time(`Processing update ${ctx.update.update_id}`);
    await next()
    console.timeEnd(`Processing update ${ctx.update.update_id}`);
})

const checkbalancebutton = Markup.button.callback('Check balance    ', '/check_balance')

bot.command('check_balance', async (ctx: Context) => {
  try {
    console.log('check_balance');
    const balance = await ethProvider.getBalanceByAddress(walletaddress);
    const tokenBalance = await ethProvider.getTokenBalanceByAddress(walletaddress,token_contracts.USDT);
    const usdtDecimalc = await ethProvider.getTokenDecimals(token_contracts.USDT)
    const usdtBalance = ethProvider.fromNativeNumber(tokenBalance, usdtDecimalc)
    const etherBalance = ethProvider.fromNativeNumber(balance).toString();
    ctx.reply(
`Balance: ${etherBalance} eth
Tokens: ${usdtBalance} usdt`)
  } catch (err) {
    console.error(err)
    ctx.reply('Error while taking balance of your wallet.')
  }
})

bot.command('start', (ctx: Context) => {
    ctx.reply('Welcome to orca scan bot!', Markup.inlineKeyboard([checkbalancebutton]))
})

bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));