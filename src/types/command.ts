import BotClient from "@/utils/botClient.js";
import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";

/**
 * Interface for defining slash commands. Import the `SlashCommandBuilder` from discord.js to create the command data.
 */
export default interface Command {
  /** The command data for Discord to display (use a SlashCommandBuilder!) */
  data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
  /** The function to execute when the command is called */
  execute: (client: BotClient, interaction: ChatInputCommandInteraction) => Promise<unknown>;
}

/**
 * Creates an command handler with the `Command` interface.
 * @param command The command handler
 * @returns The command handler
 */
export const createCommand = (command: Command) => command;
