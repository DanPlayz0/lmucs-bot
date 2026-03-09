import { SlashCommandBuilder } from "discord.js";
import { createCommand } from "../types/command.js";

export default createCommand({
  data: new SlashCommandBuilder().setName("ping").setDescription("Replies with Pong!"),
  execute: async (client, interaction) => await interaction.reply(`Pong! (${client.ws.ping}ms)`),
});
