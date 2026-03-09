import { Client, ClientOptions, Collection } from "discord.js";
import type Command from "../types/command.js";
import type Modal from "@/types/modal.js";

/**
 * Extension of the Discord.js Client class to include a collection of commands.
 * This can be extended further if needed!
 */
export default class BotClient extends Client {
  /** A collection of commands to be listened for by the bot */
  commands: Collection<string, Command>;
  modals: Collection<string, Modal>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.modals = new Collection();
  }
}
