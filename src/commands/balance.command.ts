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
                const balances = await this.orca.getBalance(address);
                if (balances) {
                    const reply = address + enter + this.parseBalances(balances);
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
                const balances = await this.orca.getBalance(ctx.session.wallets[0].address);
                const date = `Last update ${(new Date).toISOString()}`;
                const reply = date + enter + address + enter + this.parseBalances(balances);
                ctx.editMessageText(reply.toString(), updateBalanceKeyboard)
            } 
        });
    }
    parseBalances(balances: any) {
        let reply = ''
        const tags = Object.keys(balances)
        for (const tag of tags) {
            console.log(tag);
            const metadata = balances[tag].metadata
            reply += (
                metadata.name + enter + '1) ' +
                metadata.currency + ': ' + metadata.balance + enter
            )
            if (balances[tag].tokens.length>0) {
                let i = 2
                for (const token of balances[tag].tokens) {
                    reply += (
                        i + ') ' + token.symbol + ': ' + token.balance + enter
                    )
                    i+=1
                }
            }
        }
        return reply
    }
}