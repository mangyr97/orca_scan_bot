import { Telegraf } from "telegraf";
import LocalSession from "telegraf-session-local";

import { Command } from "./commands/command.class";
import { StartCommand } from "./commands/start.command";
import { SaveCommand } from "./commands/save.command";
import { BalanceCommand } from "./commands/balance.command";
import { WalletsCommand } from "./commands/wallets.command";
import { IConfigService } from "./config/config.interface";
import { ConfigService } from "./config/confis.service";
import { IBotContext } from "./context/context.interface";
import { Orcascan } from "./orcascan/orcascan.service";


class Bot {
    bot: Telegraf<IBotContext>;
    commands: Command[] = [];
    orcascan: Orcascan
    constructor(private readonly configService: IConfigService) {
        this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN'));
        this.bot.use((new LocalSession({ database: 'sessions.json' })).middleware());
        this.orcascan = new Orcascan(this.configService.get('ORCASCAN_URL'))
    }
    init() {
        this.commands = [
            new StartCommand(this.bot), 
            new SaveCommand(this.bot, this.orcascan), 
            new BalanceCommand(this.bot, this.orcascan), 
            new WalletsCommand(this.bot, this.orcascan)
        ];
        for (const command of this.commands) {
            command.handle();
        }
        this.bot.launch();
    }
}

const bot = new Bot(new ConfigService());
bot.init()