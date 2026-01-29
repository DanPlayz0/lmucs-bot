import {
  APIModalInteractionResponseCallbackData,
  ComponentType,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  TextInputStyle,
} from "discord.js";
import Command from "../types/command.js";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("github")
    .setDescription("GitHub feed commands")
    .addSubcommand(new SlashCommandSubcommandBuilder().setName("add").setDescription("Add a GitHub repo to the feed")),

  execute: async (client, interaction) => {
    const modal: APIModalInteractionResponseCallbackData = {
      custom_id: "github-feed",
      title: "GitHub Feed",
      components: [
        {
          type: 1,
          components: [
            {
              type: ComponentType.TextInput,
              style: TextInputStyle.Short,
              custom_id: "github-username",
              label: "GitHub Username",
              placeholder: "asrouji",
              required: true,
            },
          ],
        },
        {
          type: 1,
          components: [
            {
              type: ComponentType.TextInput,
              style: TextInputStyle.Short,
              custom_id: "github-reponame",
              label: "GitHub Repo Name",
              placeholder: "lmucs-discord",
              required: true,
            },
          ],
        },
      ],
    };

    await interaction.showModal(modal);
  },
};

export default command;
