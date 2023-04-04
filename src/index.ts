import { Telegraf, Markup, Context } from 'telegraf'
import { EthereumProvider, EthereumOptions } from "./ethereum";

import { ETH_RPC,BOT_TOKEN,ETH_ADDRESS } from "./utlis/config";

const walletaddress = ETH_ADDRESS;
const options: EthereumOptions = {
    url: ETH_RPC
};
const ethprovider = new EthereumProvider(options);

const bot = new Telegraf(BOT_TOKEN)
bot.use(async (ctx, next) => {
    console.log(ctx);
    console.time(`Processing update ${ctx.update.update_id}`);
    await next()
    console.timeEnd(`Processing update ${ctx.update.update_id}`);
})

const checkbalancebutton = Markup.button.callback('проверить баланс', '/check_balance')

bot.command('check_balance', async (ctx: Context) => {
  try {
    console.log('check_balance');
    const balance = await ethprovider.getBalanceByAddress(walletaddress);
    const etherbalance = ethprovider.fromNativeNumber(balance).toString();
    ctx.reply(`баланс вашего кошелька: ${etherbalance} eth`)
  } catch (err) {
    console.error(err)
    ctx.reply('произошла ошибка при получении баланса кошелька.')
  }
})

bot.command('start', (ctx: Context) => {
    ctx.reply('добро пожаловать в наш бот!', Markup.inlineKeyboard([checkbalancebutton]))
})

bot.launch()
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));