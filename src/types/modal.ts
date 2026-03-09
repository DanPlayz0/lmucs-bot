import BotClient from "@/utils/botClient.js";
import { APIModalInteractionResponseCallbackData, ModalBuilder, ModalComponentData, ModalSubmitInteraction } from "discord.js";

/**
 * Interface for defining slash commands. Import the `SlashCommandBuilder` from discord.js to create the command data.
 */
export default interface Modal {
  /** The command data for Discord to display (use a SlashCommandBuilder!) */
  data: ModalBuilder | ModalComponentData | APIModalInteractionResponseCallbackData;
  /** The function to test if the handle function should be ran */
  test?: (client: BotClient, interaction: ModalSubmitInteraction) => Promise<boolean>;
  /** The function to execute when the command is called */
  handle: (client: BotClient, interaction: ModalSubmitInteraction) => Promise<unknown>;
}

/**
 * Creates an modal handler with the `Modal` interface.
 * @param modal The modal handler
 * @returns The modal handler
 */
export const createModal = (modal: Modal) => modal;
