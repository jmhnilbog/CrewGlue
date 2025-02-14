import {
    DiscordAPIError,
    RESTJSONErrorCodes as DiscordApiErrors,
    Message,
    MessageReaction,
    PartialMessage,
    PartialMessageReaction,
    PartialUser,
    User,
} from 'discord.js';

const IGNORED_ERRORS = [
    DiscordApiErrors.UnknownMessage,
    DiscordApiErrors.UnknownChannel,
    DiscordApiErrors.UnknownGuild,
    DiscordApiErrors.UnknownUser,
    DiscordApiErrors.UnknownInteraction,
    DiscordApiErrors.MissingAccess,
];

export class PartialUtils {
    public static async fillUser(user: User | PartialUser): Promise<User | undefined> {
        if (user.partial) {
            try {
                return await user.fetch();
            } catch (error) {
                if (
                    error instanceof DiscordAPIError &&
                    typeof error.code == 'number' &&
                    IGNORED_ERRORS.includes(error.code)
                ) {
                    return;
                } else {
                    throw error;
                }
            }
        }

        return user;
    }

    public static async fillMessage(msg: Message | PartialMessage): Promise<Message | undefined> {
        if (msg.partial) {
            try {
                return await msg.fetch();
            } catch (error) {
                if (
                    error instanceof DiscordAPIError &&
                    typeof error.code == 'number' &&
                    IGNORED_ERRORS.includes(error.code)
                ) {
                    return;
                } else {
                    throw error;
                }
            }
        }

        return msg;
    }

    public static async fillReaction(
        msgReaction: MessageReaction | PartialMessageReaction
    ): Promise<MessageReaction | undefined> {
        if (msgReaction.partial) {
            try {
                msgReaction = await msgReaction.fetch();
            } catch (error) {
                if (
                    error instanceof DiscordAPIError &&
                    typeof error.code == 'number' &&
                    IGNORED_ERRORS.includes(error.code)
                ) {
                    return msgReaction as MessageReaction;
                } else {
                    throw error;
                }
            }
        }

        const message = await this.fillMessage(msgReaction.message);

        msgReaction.message = message ? message : msgReaction.message;

        return msgReaction;
    }
}
