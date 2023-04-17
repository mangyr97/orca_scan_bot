import { Context } from "telegraf";

export interface SessionData {
    botLike: boolean
    address?: string
}
export interface IBotContext extends Context {
    session: SessionData
}