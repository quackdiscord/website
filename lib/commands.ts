export interface CommandParameter {
    name: string;
    description: string;
    type: "user" | "string" | "number" | "channel" | "role" | "boolean" | "duration" | "message";
}

export interface Command {
    name: string;
    description: string;
    usage?: string;
    parameters: {
        required: CommandParameter[];
        optional: CommandParameter[];
    };
    examples?: string[];
    permissions?: string[];
    extra_info?: string;
    cooldown?: string;
}

export interface CommandCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
    commands: Command[];
}

export const commandCategories: CommandCategory[] = [
    {
        id: "moderation",
        name: "Moderation",
        description: "Tools to keep your server safe and enforce rules",
        icon: "shield",
        commands: [
            {
                name: "kick",
                description: "Kick a user from the server",
                parameters: {
                    required: [
                        { name: "user", description: "The user to kick", type: "user" },
                    ],
                    optional: [
                        { name: "reason", description: "The reason for the kick", type: "string" },
                    ],
                },
                examples: ["/kick @user", "/kick @user \"Inappropriate behavior\""],
                permissions: ["Kick Members"],
                extra_info: "This will create a case for the user and attempt to DM them.",
            },
            {
                name: "ban",
                description: "Permanently ban a user from the server",
                parameters: {
                    required: [
                        { name: "user", description: "The user to ban", type: "user" },
                    ],
                    optional: [
                        { name: "reason", description: "The reason for the ban", type: "string" },
                        { name: "appeal", description: "Whether or not the user can appeal the ban (default: true)", type: "boolean" },
                    ],
                },
                examples: ["/ban @user \"Harassment\"", "/ban @user \"Raiding\" false"],
                permissions: ["Ban Members"],
                extra_info: "This will create a case for the user and attempt to DM them. If appeals are setup, the user will be able to appeal the ban as long as `appeal` is set to `true`.",
            },
            {
                name: "unban",
                description: "Unban a previously banned user",
                parameters: {
                    required: [
                        { name: "user", description: "The user to unban", type: "user" },
                    ],
                    optional: [
                        { name: "reason", description: "The reason for unbanning", type: "string" },
                    ],
                },
                examples: ["/unban 123456789012345678", "/unban @user \"Appeal accepted\""],
                permissions: ["Ban Members"],
                extra_info: "This will create a case for the user and attempt to DM them an invite link.",
            },
            {
                name: "timeout add",
                description: "Temporarily mute a user, preventing them from sending messages",
                parameters: {
                    required: [
                        { name: "user", description: "The user to timeout", type: "user" },
                        { name: "time", description: "How long to timeout (e.g., 10m, 1h, 1d)", type: "duration" },
                    ],
                    optional: [
                        { name: "reason", description: "The reason for the timeout", type: "string" },
                    ],
                },
                examples: ["/timeout add @user 1h \"Spamming\"", "/timeout add @user 30m \"Cool down\""],
                permissions: ["Moderate Members"],
                extra_info: "This will create a case for the user and attempt to DM them.",
            },
            {
                name: "timeout remove",
                description: "Remove a timeout from a user",
                parameters: {
                    required: [
                        { name: "user", description: "The user to untimeout", type: "user" },
                    ],
                    optional: [],
                },
                examples: ["/timeout remove @user"],
                permissions: ["Moderate Members"],
                extra_info: "This will NOT create a case for the user.",
            },
            {
                name: "user",
                description: "Get a detailed view of a user's moderation profile",
                parameters: {
                    required: [
                        { name: "user", description: "The user to get info for", type: "user" },
                    ],
                    optional: [],
                },
                examples: ["/user @user"],
                permissions: ["Moderate Members"],
                extra_info: "This will show the user's case count, note count, appeal count, ticket count, latest case details, and latest note details.",
            },
            {
                name: "purge all",
                description: "Bulk delete messages in a channel",
                parameters: {
                    required: [
                        { name: "amount", description: "Number of messages to delete (1-100)", type: "number" },
                    ],
                    optional: [
                        { name: "channel", description: "The channel to purge messages from, defaults to the current channel", type: "channel" },
                    ],
                },
                examples: ["/purge all 50", "/purge all 20 #general"],
                permissions: ["Manage Messages"],
            },
            {
                name: "purge user",
                description: "Bulk delete messages from a specific user in a channel",
                parameters: {
                    required: [
                        { name: "user", description: "The user to purge messages from", type: "user" },
                        { name: "amount", description: "Number of messages to delete (1-100)", type: "number" },
                    ],
                    optional: [
                        { name: "channel", description: "The channel to purge messages from, defaults to the current channel", type: "channel" },
                    ],
                },
                examples: ["/purge user @user 50", "/purge user @user 20 #general"],
                permissions: ["Manage Messages"],
            },
            {
                name: "purge attachments",
                description: "Bulk delete messages with attachments in a channel",
                parameters: {
                    required: [
                        { name: "amount", description: "Number of messages to delete (1-100)", type: "number" },
                    ],
                    optional: [
                        { name: "channel", description: "The channel to purge messages from, defaults to the current channel", type: "channel" },
                    ],
                },
                examples: ["/purge attachments 50", "/purge attachments 20 #general"],
                permissions: ["Manage Messages"],
            },
            {
                name: "purge bots",
                description: "Bulk delete messages from bots in a channel",
                parameters: {
                    required: [
                        { name: "amount", description: "Number of messages to delete (1-100)", type: "number" },
                    ],
                    optional: [
                        { name: "channel", description: "The channel to purge messages from, defaults to the current channel", type: "channel" },
                    ],
                },
                examples: ["/purge bots 50", "/purge bots 20 #general"],
                permissions: ["Manage Messages"],
            },
            {
                name: "purge contains",
                description: "Bulk delete messages containing a specific string in a channel",
                parameters: {
                    required: [
                        { name: "string", description: "The string to purge messages containing", type: "string" },
                        { name: "amount", description: "Number of messages to delete (1-100)", type: "number" },
                    ],
                    optional: [
                        { name: "channel", description: "The channel to purge messages from, defaults to the current channel", type: "channel" },
                    ],
                },
                examples: ["/purge contains \"spam\" 50", "/purge contains \"spam\" 20 #general"],
                permissions: ["Manage Messages"],
            },
            {
                name: "purge embeds",
                description: "Bulk delete messages with embeds in a channel",
                parameters: {
                    required: [
                        { name: "amount", description: "Number of messages to delete (1-100)", type: "number" },
                    ],
                    optional: [
                        { name: "channel", description: "The channel to purge messages from, defaults to the current channel", type: "channel" },
                    ],
                },
                examples: ["/purge embeds 50", "/purge embeds 20 #general"],
                permissions: ["Manage Messages"],
            },
            {
                name: "purge emoji",
                description: "Bulk delete messages containing a specific emoji in a channel",
                parameters: {
                    required: [
                        { name: "emoji", description: "The emoji to purge messages containing", type: "string" },
                        { name: "amount", description: "Number of messages to delete (1-100)", type: "number" },
                    ],
                    optional: [
                        { name: "channel", description: "The channel to purge messages from, defaults to the current channel", type: "channel" },
                    ],
                },
                examples: ["/purge emoji 🔥 50", "/purge emoji 🔥 20 #general"],
                permissions: ["Manage Messages"],
            },
            {
                name: "purge quack",
                description: "Bulk delete messages from Quack in a channel",
                parameters: {
                    required: [
                        { name: "amount", description: "Number of messages to delete (1-100)", type: "number" },
                    ],
                    optional: [
                        { name: "channel", description: "The channel to purge messages from, defaults to the current channel", type: "channel" },
                    ],
                },
                examples: ["/purge quack 50", "/purge quack 20 #general"],
                permissions: ["Manage Messages"],
            },
            {
                name: "lockdown",
                description: "Lock a channel, preventing members from sending messages",
                parameters: {
                    required: [
                        { name: "channel", description: "The channel to lock", type: "channel" },
                    ],
                    optional: [],
                },
                examples: ["/lockdown #general"],
                permissions: ["Moderate Members"],
            },
            {
                name: "unlock",
                description: "Unlock a previously locked channel",
                parameters: {
                    required: [
                        { name: "channel", description: "The channel to unlock", type: "channel" },
                    ],
                    optional: [],
                },
                examples: ["/unlock #general"],
                permissions: ["Moderate Members"],
            },
        ],
    },
    {
        id: "cases",
        name: "Cases & Notes",
        description: "View and manage moderation history and user notes",
        icon: "file-text",
        commands: [
            {
                name: "cases add",
                description: "Warn a user",
                parameters: {
                    required: [
                        { name: "user", description: "The user to warn", type: "user" },
                        { name: "reason", description: "The reason for the warning", type: "string" },
                    ],
                    optional: [],
                },
                examples: ["/cases add @user \"Spamming\""],
                permissions: ["Moderate Members"],
                extra_info: "This will create a case for the user and attempt to DM them.",
            },
            {
                name: "warn",
                description: "An alias for /cases add",
                parameters: {
                    required: [
                        { name: "user", description: "The user to warn", type: "user" },
                        { name: "reason", description: "The reason for the warning", type: "string" },
                    ],
                    optional: [],
                },
                examples: ["/warn @user \"Spamming\""],
                permissions: ["Moderate Members"],
                extra_info: "This will create a case for the user and attempt to DM them.",
            },
            {
                name: "cases remove id",
                description: "Remove a case by ID",
                parameters: {
                    required: [
                        { name: "id", description: "The case ID to remove", type: "string" },
                    ],
                    optional: [],
                },
                examples: ["/cases remove id 77919754"],
                permissions: ["Moderate Members"],
            },
            {
                name: "cases remove user",
                description: "Remove all cases for a user",
                parameters: {
                    required: [
                        { name: "user", description: "The user to remove cases for", type: "user" },
                    ],
                    optional: [],
                },
                examples: ["/cases remove user @user"],
                permissions: ["Moderate Members"],
            },
            {
                name: "cases remove latest",
                description: "Remove the latest case in the server",
                parameters: {
                    required: [],
                    optional: [],
                },
                examples: ["/cases remove latest"],
                permissions: ["Moderate Members"],
            },
            {
                name: "cases view id",
                description: "View a case by ID",
                parameters: {
                    required: [
                        { name: "id", description: "The case ID to view", type: "string" },
                    ],
                    optional: [],
                },
                examples: ["/cases view id 77919754"],
                permissions: ["Moderate Members"],
            },
            {
                name: "cases view user",
                description: "View all cases for a user",
                parameters: {
                    required: [
                        { name: "user", description: "The user to view cases for", type: "user" },
                    ],
                    optional: [],
                },
                examples: ["/cases view user @user"],
                permissions: ["Moderate Members"],
            },
            {
                name: "cases view latest",
                description: "View the latest case in the server",
                parameters: {
                    required: [],
                    optional: [],
                },
                examples: ["/cases view latest"],
                permissions: ["Moderate Members"],
            },
            {
                name: "notes add",
                description: "Add a note to a user's moderation profile",
                parameters: {
                    required: [
                        { name: "user", description: "The user to add a note to", type: "user" },
                        { name: "content", description: "The content of the note", type: "string" },
                    ],
                    optional: [],
                },
                examples: ["/notes add @user \"Spamming\""],
                permissions: ["Moderate Members"],
                extra_info: "This will add a note to the user's moderation profile for the other mods, but it will not be visible to the user.",
            },
            {
                name: "notes remove id",
                description: "Remove a note by ID",
                parameters: {
                    required: [
                        { name: "id", description: "The note ID to remove", type: "string" },
                    ],
                    optional: [],
                },
                examples: ["/notes remove id 77919754"],
                permissions: ["Moderate Members"],
            },
            {
                name: "notes remove user",
                description: "Remove all notes for a user",
                parameters: {
                    required: [
                        { name: "user", description: "The user to remove notes for", type: "user" },
                    ],
                    optional: [],
                },
                examples: ["/notes remove user @user"],
                permissions: ["Moderate Members"],
            },
            {
                name: "notes view id",
                description: "View a note by ID",
                parameters: {
                    required: [
                        { name: "id", description: "The note ID to view", type: "string" },
                    ],
                    optional: [],
                },
                examples: ["/notes view id 77919754"],
                permissions: ["Moderate Members"],
            },
            {
                name: "notes view user",
                description: "View all notes for a user",
                parameters: {
                    required: [
                        { name: "user", description: "The user to view notes for", type: "user" },
                    ],
                    optional: [],
                },
                examples: ["/notes view user @user"],
                permissions: ["Moderate Members"],
            },
            {
                name: "notes view latest",
                description: "View the latest note in the server",
                parameters: {
                    required: [],
                    optional: [],
                },
                examples: ["/notes view latest"],
                permissions: ["Moderate Members"],
            },
        ],
    },
    {
        id: "tickets",
        name: "Tickets",
        description: "Private support ticket system for your server",
        icon: "ticket",
        commands: [
            {
                name: "ticket channel",
                description: "Set the channel for the ticket system to operate in",
                parameters: {
                    required: [
                        { name: "channel", description: "The channel to set for the ticket system", type: "channel" },
                    ],
                    optional: [
                        { name: "message", description: "A custom message to send to the ticket channel where users can open tickets", type: "string" },
                    ]
                },
                examples: ["/ticket", "/ticket Need help with roles"],
                permissions: ["Moderate Members"],
                extra_info: "This will set the channel for the ticket system to operate in. A message will be sent to that channel where users can click a button to open a ticket. New tickets will be opened in a thread attached to that channel. Remove @everyone's permissions to send messages in the channel.",
            },
            {
                name: "ticket log channel",
                description: "Set the channel you want ticket logs to be sent to",
                parameters: {
                    required: [
                        { name: "channel", description: "The channel to send ticket logs to", type: "channel" },
                    ],
                    optional: [],
                },
                examples: ["/ticket log channel #ticket-logs"],
                permissions: ["Moderate Members"],
                extra_info: "Logs will be sent to this channel when tickets are opened, and will update when tickets are closed.",
            },
            {
                name: "ticket queue",
                description: "Get a queue of open tickets",
                parameters: {
                    required: [],
                    optional: [],
                },
                examples: ["/ticket queue"],
                permissions: ["Moderate Members"],
                extra_info: "This will show a list of open tickets in the server.",
            },
        ],
    },
    {
        id: "logs",
        name: "Logs",
        description: "Private event logs for your server",
        icon: "clipboard-list",
        commands: [
            {
                name: "log channel",
                description: "Set the channel to send logs to",
                parameters: {
                    required: [
                        { name: "channel", description: "The channel to set for the ticket system", type: "channel" },
                        { name: "type", description: "The type of log to send to the channel", type: "string" },
                    ],
                    optional: []
                },
                examples: ["/log channel #message-logs messages", "/log channel #member-logs members"],
                permissions: ["Moderate Members"],
            },
            {
                name: "log disable",
                description: "Disable a log type",
                parameters: {
                    required: [
                        { name: "type", description: "The type of log to disable", type: "string" },
                    ],
                    optional: [],
                },
                examples: ["/log disable messages", "/log disable members"],
                permissions: ["Moderate Members"],
                extra_info: "This will disable the log type from being sent to the channel.",
            }
        ],
    },
    {
        id: "appeals",
        name: "Appeals",
        description: "Ban appeal system for your server",
        icon: "flag",
        commands: [
            {
                name: "appeals setup",
                description: "Setup the appeals system",
                parameters: {
                    required: [
                        { name: "channel", description: "The channel to send appeal logs to", type: "channel" },
                    ],
                    optional: [],
                },
                examples: ["/appeals setup #appeals"],
                permissions: ["Moderate Members"],
                extra_info: "This will setup the appeals system. When users submit an appeal, mods will be able to review it in this channel. Make sure this is a private text channel.",
            },
            {
                name: "appeals queue",
                description: "Get a queue of open appeals",
                parameters: {
                    required: [],
                    optional: [],
                },
                examples: ["/appeals queue"],
                permissions: ["Moderate Members"],
                extra_info: "This list will be sorted by the date the appeal was submitted, in ascending order (oldest first)."
            }
        ],
    },
    {
        id: "honeypot",
        name: "Honeypot",
        description: "An automated system to catch spammers and trolls",
        icon: "crosshair",
        commands: [
            {
                name: "honeypot create",
                description: "Create a new honeypot channel",
                parameters: {
                    required: [],
                    optional: [
                        { name: "message", description: "A custom message to send to the channel", type: "string" },
                    ],
                },
                examples: ["/honeypot create", "/honeypot create \"DO NOT MESSAGE HERE. You will be instantly banned.\""],
                permissions: ["Moderate Members"],
                extra_info: "A honeypot channel is a channel that anyone can message, but if they do, they will be banned instantly. This system is designed to catch bots who join the server and immediately message every channel in the server with some spammy message. Users who get banned by this system will have a case created and will be DM'd from the bot. They can appeal the ban in case its a real user who can't read the message and is dumb.",
            },
        ],
    },
    {
        id: "utility",
        name: "Utility",
        description: "Helpful utility commands for server information",
        icon: "wrench",
        commands: [
            {
                name: "help",
                description: "Get help with the bot",
                parameters: {
                    required: [],
                    optional: [],
                },
                examples: ["/help"],
                permissions: [],
            },
            {
                name: "ping",
                description: "Get the bot's latency",
                parameters: {
                    required: [],
                    optional: [],
                },
                examples: ["/ping"],
                permissions: [],
            },
            {
                name: "stats",
                description: "Get the bot's statistics",
                parameters: {
                    required: [],
                    optional: [],
                },
                examples: ["/stats"],
                permissions: [],
            },
            {
                name: "server info",
                description: "Get some information about the server",
                parameters: {
                    required: [],
                    optional: [],
                },
                examples: ["/server info"],
                permissions: [],
            }
        ],
    },
    {
        id: "fun",
        name: "Fun",
        description: "Fun commands to keep your community engaged",
        icon: "gamepad-2",
        commands: [
            {
                name: "coinflip",
                description: "Flip a coin",
                parameters: {
                    required: [],
                    optional: [],
                },
                examples: ["/coinflip"],
                permissions: [],
            }
        ],
    },
];

export function getCommandCount(): number {
    return commandCategories.reduce((acc, cat) => acc + cat.commands.length, 0);
}

export function getCategoryCount(): number {
    return commandCategories.length;
}
