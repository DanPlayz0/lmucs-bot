import BotClient from "@/utils/botClient.js";
import { BaseInteraction } from "discord.js";

export default interface InteractionHandler<T extends BaseInteraction> {
  handle(client: BotClient, interaction: T): Promise<unknown>;
}
