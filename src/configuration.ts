import deepFreeze from "./utils/deepFreeze.js";
import "dotenv/config";
import getIdFromToken from "./utils/getIdFromToken.js";
import tryDefault from "./utils/tryDefault.js";

function requiredEnvVar(env: string, error?: string) {
  const variable = process.env[env] ?? undefined;
  if (variable === undefined) throw !error ? `Environment variable ${env} is required but not set.` : error;
  return variable;
}

const configuration = deepFreeze({
  token: requiredEnvVar("BOT_TOKEN"),
  client_id: process.env.CLIENT_ID ?? getIdFromToken(requiredEnvVar("BOT_TOKEN")),

  roles: {
    student: requiredEnvVar("STUDENT_ROLE_ID"),
    alumni: requiredEnvVar("ALUMNI_ROLE_ID"),
    guest: requiredEnvVar("GUEST_ROLE_ID"),
  },
  channels: {
    general: requiredEnvVar("GENERAL_CHANNEL_ID"),
    github_feed: requiredEnvVar("GITHUB_FEED_CHANNEL_ID"),
    moderators: requiredEnvVar("MODERATOR_CHANNEL_ID"),
  },

  calendar_urls: tryDefault("CALENDAR_URLS", (value) => value.split(","), [process.env.CLASS_1010_URL]),
});
export default configuration;
