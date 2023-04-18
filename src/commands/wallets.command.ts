import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "context/context.interface";
import { IOrcascan } from "orcascan/orcascan.interface";
import { balanceKeyboard, menuKeyboard } from "./buttons/buttons";

const enter = `
`

export class WalletsCommand extends Command {
    constructor(bot: Telegraf<IBotContext>, public orca: IOrcascan) {
        super(bot);
    }

    handle(): void {
        this.bot.action("show_wallets", async (ctx)=>{
            console.log('show_wallets');
            console.log(ctx.from);
            if (ctx.from) {
                const id = ctx.from.id.toString()
                const wallets = await this.orca.getWalletsByTgId(id)
                console.log(wallets);
                if (wallets) {
                    ctx.session.wallets = wallets;
                    for (const wallet of wallets) {
                        ctx.reply(wallet.address, balanceKeyboard)
                    }
                } else {
                    ctx.editMessageText('No wallets', menuKeyboard)
                }
            } else {
                ctx.session.botLike = true;
                ctx.reply("Something going wrong");
            }
        });
    }
}