import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "context/context.interface";
import { IOrcascan } from "orcascan/orcascan.interface";
import { menuKeyboard } from "./buttons/buttons";
import { extractEthAddress } from "../utils/address-utils";

export class SaveCommand extends Command {
    private saveMode: boolean = false;
    constructor(bot: Telegraf<IBotContext>, public orca: IOrcascan) {
        super(bot);
    }

    handle(): void {
        this.bot.action("save_address", async (ctx)=>{
            this.saveMode = true;
            ctx.deleteMessage()
            ctx.reply("Paste address");
        });
        this.bot.on('text', async (ctx) => {
            if (this.saveMode) {
                const text = ctx.message.text;
                const address = extractEthAddress(text)
                if (address) {
                    const wallet = await this.orca.createWallet({
                        address: address,
                        telegram_user_id: ctx.message.from.id.toString()
                    });
                    if (wallet) {
                        ctx.session.wallets? ctx.session.wallets.push(wallet):ctx.session.wallets=[wallet];
                        console.log(ctx.session);
                        console.log(ctx.message.chat.id);
                        
                        ctx.reply('Address saved', menuKeyboard);
                        this.saveMode = false;
                    } else {
                        ctx.reply('Address already exist')
                    } 
                } else {
                    ctx.reply('No address found, try again')
                }
            }
        })
    }
}