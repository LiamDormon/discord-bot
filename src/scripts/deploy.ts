import {REST, Routes, APIUser} from "discord.js";
import commands from "../commands"
import * as dotenv from 'dotenv'
dotenv.config()

const token = process.env['CLIENT_TOKEN'] as string;
const guildId = process.env['GUILD_ID'] as string;
const clientId = process.env['CLIENT_ID'] as string;

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`started refreshing slash commands`)

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands.map(command => command.meta.toJSON()) }
        )

        console.log(`Successfully reloaded commands`)
    } catch(e) {
        console.error(e)
    }
})().finally(() => {
    process.exit(0)
});