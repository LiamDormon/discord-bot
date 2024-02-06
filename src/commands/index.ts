import {Command} from "../types";
import {Collection} from "discord.js";

const commands: Command[] = []

export const commandsCollection = new Collection<string, Command>()

commands.forEach(command => {
    commandsCollection.set(command.meta.name, command)
})

export default commands
