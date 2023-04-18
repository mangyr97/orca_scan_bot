import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "context/context.interface";
import { IOrcascan } from "orcascan/orcascan.interface";
import { updateBalanceKeyboard } from "./buttons/buttons";
import { extractEthAddress } from "../utils/address-utils";

const enter = "\n"

export class BalanceCommand extends Command {
    constructor(bot: Telegraf<IBotContext>, public orca: IOrcascan) {
        super(bot);
    }

    handle(): void {
        this.bot.action("balance", async (ctx)=>{
            if (ctx.session.wallets) {
                // @ts-ignore
                const address = ctx.update.callback_query.message.text;
                console.log(address);
                const balance = await this.orca.getBalance(address);
                if (balance) {
                    const reply = address+enter+balance
                    ctx.editMessageText(reply, updateBalanceKeyboard);
                } else {
                    ctx.reply('Something going wrong');
                }
            } 
        });
        this.bot.action("update_balance", async (ctx)=>{
            if (ctx.session.wallets) {
                // @ts-ignore
                const address = extractEthAddress(ctx.update.callback_query.message.text);
                console.log(address);
                const balance = await this.orca.getBalance(ctx.session.wallets[0].address);
                // console.log(balance);
                const date = `Last update ${(new Date).toISOString()}`;
                const reply = date + enter + address + enter + balance;
                // console.log(date + enter + address + enter + balance);
                
                ctx.editMessageText(reply.toString(), updateBalanceKeyboard)
            } 
        });
    }
    
}