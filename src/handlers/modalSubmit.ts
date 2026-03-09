import { EmbedBuilder, GuildMember, GuildMemberRoleManager, MessageFlags, ModalSubmitInteraction, TextChannel } from "discord.js";
import type InteractionHandler from "../types/handler.js";
import { WELCOME_MESSAGES } from "../utils/constants.js";
import configuration from "@/configuration.js";
import githubFeed from "@/modals/github-feed.js";

const roleMap = {
  student: configuration.roles.student,
  alum: configuration.roles.alumni,
  guest: configuration.roles.guest,
};

function isRoleKey(key: string): key is keyof typeof roleMap {
  return key in roleMap;
}

const handler: InteractionHandler<ModalSubmitInteraction> = {
  handle: async (client, interaction) => {
    if (interaction.customId.startsWith("onboarding-modal")) {
      // new member finished onboarding!
      await interaction.deferUpdate();

      if (!interaction.member) {
        console.error(`No member found for user ${interaction.member}`);
        return;
      }

      const fullName = interaction.fields.getTextInputValue("onboarding-prompt-full-name");

      try {
        await (interaction.member as GuildMember).setNickname(fullName);
      } catch (error) {
        console.error(`Insufficient permissions to change nickname for ${interaction.user.username}`);
      }

      // assign appropriate role to user
      const selection = interaction.customId.split("-")[2];
      if (!isRoleKey(selection)) {
        console.error(`Invalid role selection ${selection} for user ${interaction.member}`);
        return;
      }
      const role = interaction.guild?.roles.cache.find((role) => role.id === roleMap[selection]);
      if (!role) {
        console.error(`Could not find role ${selection} (with id ${roleMap[selection]}) for user ${interaction.member}`);
      } else {
        try {
          await (interaction.member.roles as GuildMemberRoleManager).add(role);
        } catch (error) {
          console.error(`Insufficient permissions to add role ${selection} for ${interaction.member}`);
        }
      }

      // if the user is a student, send a welcome message to #general
      if (selection === "student") {
        const generalChannelId = configuration.channels.general;
        const generalChannel = interaction.guild?.channels.cache.find((channel) => channel.id === generalChannelId);
        /* istanbul ignore if */
        if (!interaction.guild) {
          console.error(`No guild found for interaction`);
        } else if (!generalChannel || !generalChannel.isTextBased()) {
          console.error(`Could not find general channel with ID ${generalChannelId}`);
        } else {
          const welcomeMessage = WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];
          const joinEmoji = interaction.guild.emojis.cache.find((emoji) => emoji.id === configuration.emojis.join);
          await generalChannel
            .send({
              content: `${joinEmoji ? `${joinEmoji}  ` : ""}${welcomeMessage.replaceAll("{user}", interaction.user.toString())}`,
            })
            .catch(console.error);
        }
      }
    } else {
      let modal = client.modals.get(interaction.customId);
      if (!modal)
        modal = client.modals.find((modal) =>
          "test" in modal && typeof modal.test === "function" ? modal.test(client, interaction) : false,
        );
      if (!modal) {
        console.error(`Modal ${interaction.customId} not found.`);
        await interaction.reply({ content: "Modal not found on server!", flags: MessageFlags.Ephemeral });
        return;
      }

      try {
        await modal.handle(client, interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: "There was an error while handling this modal!", flags: MessageFlags.Ephemeral });
      }
    }
  },
};

export default handler;
