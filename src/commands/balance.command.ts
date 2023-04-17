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
            if (ctx.session.address) {
                
            }
            ctx.editMessageText("100 eth");
        });
    }
    
}