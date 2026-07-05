// Defines a bot's information

export const BOT_NAMES = ["John", "Bob", "Carlos", "Iris", "Jessica"] as const;
export type BotName = typeof BOT_NAMES[number];