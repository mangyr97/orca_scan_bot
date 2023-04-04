import { Telegraf, Context } from 'telegraf'
import { EthereumProvider, EthereumOptions } from "./ethereum";

import { ETH_RPC,BOT_TOKEN } from "./utlis/config";


// Укажите адрес вашего кошелька и адрес узла Ethereum
const walletAddress = '0x3428C6B411C6e3147DAD28cdAc63CB736444eA97'
const options: EthereumOptions = {
    url: ETH_RPC
}
// Создайте объект Web3
const ethProvider = new EthereumProvider(options);


// Создайте объект Telegraf
const bot = new Telegraf(BOT_TOKEN)

// Определите команду для получения баланса
bot.command('balance', async (ctx: Context) => {
  try {
    // Получите баланс кошелька в wei
    const balance = await ethProvider.getBalanceByAddress(walletAddress);

    // Преобразуйте wei в ether
    const etherBalance = ethProvider.fromNativeNumber(balance).toString()

    // Отправьте сообщение с балансом кошелька
    ctx.reply(`Баланс вашего кошелька: ${etherBalance} ETH`)
  } catch (err) {
    console.error(err)
    ctx.reply('Произошла ошибка при получении баланса кошелька.')
  }
})

// Запустите бот
bot.launch()
