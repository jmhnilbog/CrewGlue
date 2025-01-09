export { Args } from './args.js';
export { Command, CommandDeferType } from './command.js';
export { ChatCommandMetadata, MessageCommandMetadata, UserCommandMetadata } from './metadata.js';

/**
 * Creating new commands means:
 *
 * 1. Creating a new command module within /src/commands.
 * 1. Adding information about the new command in the root /lang dir.
 * 1. Adding information about the new command in /src/commands/args.ts
 * 1. Adding information about the new command in /src/commands/metadata.ts
 * 1. Adding information about the new command in /src/enums
 */
