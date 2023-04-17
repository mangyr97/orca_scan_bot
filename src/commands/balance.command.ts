import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "context/context.interface";
import { IOrcascan } from "orcascan/orcascan.interface";

export class BalanceCommand extends Command {
    constructor(bot: Telegraf<IBotContext>, public orca: IOrcascan) {
        super(bot);
    }

    handle(): void {
        this.bot.action("balance", async (ctx)=>{
            if (ctx.session.wallets) {
                const balance = await this.orca.getBalance(ctx.session.wallets[0].address);
                console.log(balance);
                ctx.reply(balance, Markup.inlineKeyboard([
                    Markup.button.callback("Update","update_balance"),
                ]))
            } 
        });
        this.bot.action("update_balance", async (ctx)=>{
            if (ctx.session.wallets) {
                const balance = await this.orca.getBalance(ctx.session.wallets[0].address);
                console.log(balance);
                ctx.reply(balance, Markup.inlineKeyboard([
                    Markup.button.callback("Update","update_balance"),
                ]))
            } 
        });
    }
    
}