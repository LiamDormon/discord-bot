import {Command} from "../types";
import {Collection} from "discord.js";
import Nick from "./nick";
import Role from "./role"

const commands = [Nick, Role]

export const commandsCollection = new Collection<string, Command>()

commands.forEach(command => {
    commandsCollection.set(command.meta.name, command)
})

export default commands
