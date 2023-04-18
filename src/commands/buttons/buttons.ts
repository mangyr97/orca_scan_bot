import { Markup } from "telegraf";

export const menuKeyboard = Markup.inlineKeyboard([
    Markup.button.callback("Add address", "save_address"),
    Markup.button.callback("Show wallets", "show_wallets"),
]);

export const balanceKeyboard = Markup.inlineKeyboard([
    Markup.button.callback("Check balance", "balance"),
]);

export const updateBalanceKeyboard = Markup.inlineKeyboard([
    Markup.button.callback("Update balance","update_balance"),
]);