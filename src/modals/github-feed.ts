import configuration from "@/configuration.js";
import { createModal } from "@/types/modal.js";
import { ChannelType, ComponentType, EmbedBuilder, MessageFlags, TextChannel, TextInputStyle } from "discord.js";

export default createModal({
  data: {
    custom_id: "github-feed",
    title: "GitHub Feed",
    components: [
      {
        type: ComponentType.ActionRow,
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
        type: ComponentType.ActionRow,
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
  },
  handle: async (client, interaction) => {
    const username = interaction.fields.getTextInputValue("github-username");
    const repoName = interaction.fields.getTextInputValue("github-reponame");

    if (!username || !repoName) {
      interaction.reply({ content: "One or more fields were left blank, please try again.", ephemeral: true });
      return;
    }

    const repoLink = `https://github.com/${username}/${repoName}/settings/hooks`;

    const githubFeedChannel = interaction.guild?.channels.cache.find((channel) => channel.id === configuration.channels.github_feed);

    if (!githubFeedChannel || githubFeedChannel.type !== ChannelType.GuildText) {
      console.error(`Could not find GitHub feed channel with ID ${configuration.channels.github_feed}`);
      interaction.reply({ content: "Failed to create webhook, please try again later.", ephemeral: true });
      return;
    }

    const webhook = await githubFeedChannel.createWebhook({
      // discord doesn't allow webhooks to have 'discord' in the name
      name: `${username}-${repoName.replace("discord", "dscd")}`,
    });

    const embed = new EmbedBuilder()
      .setTitle("GitHub Feed Setup")
      .setColor("#ffffff")
      .setDescription(`Thanks ${interaction.user}! Just a few more steps to finish setup:`)
      .addFields(
        {
          name: "1. Go to your repository webhook settings",
          value: `${repoLink}`,
        },
        {
          name: '2. Paste the following URL into the "Payload URL" field:',
          value: `\`${webhook.url}/github\``,
        },
        {
          name: "3. Configure the webhook",
          value:
            "• Set `Content type` to `application/json`\n• Leave the `Secret` field blank\n• Trigger the webhook on `Just the push event`",
        },
        {
          name: '4. Click "Add webhook"',
          value: "After this, you're all set! You can dismiss this message.",
        },
      );

    await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
  },
});
