import { Telegraf } from "telegraf";
import { Command } from "./command.class";
import { IBotContext } from "context/context.interface";
import { menuKeyboard } from "./buttons/buttons";

export class StartCommand extends Command {
    constructor(bot: Telegraf<IBotContext>) {
        super(bot);
    }

    handle(): void {
        this.bot.start((ctx) => {
            console.log(ctx.session);
            ctx.reply("Welcome to Orcascan!", menuKeyboard)
        });
    }
}