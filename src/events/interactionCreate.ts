import { Events } from "discord.js";
import { createEvent } from "../types/event.js";
import chatInputCommandHandler from "../handlers/chatInputCommand.js";
import stringSelectMenuHandler from "../handlers/stringSelectMenu.js";
import modalSubmitHandler from "../handlers/modalSubmit.js";

const event = createEvent({
  name: Events.InteractionCreate,
  once: false,
  execute: async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
      chatInputCommandHandler.handle(client, interaction);
    } else if (interaction.isStringSelectMenu()) {
      stringSelectMenuHandler.handle(client, interaction);
    } else if (interaction.isModalSubmit()) {
      modalSubmitHandler.handle(client, interaction);
    } else {
      console.error(`Unknown interaction (type ${interaction.type})`);
    }
  },
});

export default event;
