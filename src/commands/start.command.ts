import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "context/context.interface";

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start((ctx) => {
            console.log(ctx.session);
            ctx.reply("Welcome to Orcascan!", Markup.inlineKeyboard([
                Markup.button.callback("Like","bot_like"),
                Markup.button.callback("Dislike","bot_dislike"),
                Markup.button.callback("Add address","save_address"),
            ]))
        });

        this.bot.action("bot_like", (ctx)=>{
            ctx.session.botLike = true;
            ctx.editMessageText("Cool");
        });

        this.bot.action("bot_dislike", (ctx)=>{
            ctx.session.botLike = false;
            ctx.editMessageText("Not cool");
        });
    }
    
}