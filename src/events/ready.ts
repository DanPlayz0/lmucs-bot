import { Events } from "discord.js";
import { createEvent } from "../types/event.js";

const event = createEvent({
  name: Events.ClientReady,
  once: true,
  execute: async (_, client) => {
    console.log(`Logged in as ${client.user?.tag}`);
    console.log(`Connected to ${client.guilds.cache.size} guilds.`);
  },
});

export default event;
