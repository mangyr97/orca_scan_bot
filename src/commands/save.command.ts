import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "context/context.interface";
import { IOrcascan } from "orcascan/orcascan.interface";

export class SaveCommand extends Command {
    private saveMode: boolean = false;
    constructor(bot: Telegraf<IBotContext>, public orca: IOrcascan) {
        super(bot);
    }

    handle(): void {
        this.bot.action("save_address", async (ctx)=>{
            this.saveMode = true  
            ctx.editMessageText("Paste address");
        });
        this.bot.on('text', async (ctx) => {
            if (this.saveMode) {
                const keyboard = Markup.inlineKeyboard([
                    Markup.button.callback("Balance", "balance"),
                ]);
                const text = ctx.message.text;
                const address = this.extractEthAddress(text)
                if (address) {
                    const wallet = await this.orca.createWallet({
                        address: address!,
                        telegram_user_id: ctx.message.from.id.toString()
                    })
                    if (wallet) {
                        ctx.session.wallets? ctx.session.wallets.push(wallet):ctx.session.wallets=[wallet];
                        console.log(ctx.session);
                        ctx.copyMessage(ctx.message.chat.id, keyboard);
                        this.saveMode = false;
                    }
                    ctx.reply('Address already exist')
                } else {
                    ctx.reply('No address found, try again')
                }
            }
        })
    }
    private extractEthAddress(text: string): string | null {
        const pattern = /0x[a-fA-F0-9]{40}/;
        const match = text.match(pattern);
        if (match) {
          return match[0];
        } else {
          return null;
        }
    }
}