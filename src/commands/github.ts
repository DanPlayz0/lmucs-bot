import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "discord.js";
import { createCommand } from "@/types/command.js";
import githubFeed from "@/modals/github-feed.js";

export default createCommand({
  data: new SlashCommandBuilder()
    .setName("github")
    .setDescription("GitHub feed commands")
    .addSubcommand(new SlashCommandSubcommandBuilder().setName("add").setDescription("Add a GitHub repo to the feed")),

  execute: async (client, interaction) => {
    await interaction.showModal(githubFeed.data);
  },
});
