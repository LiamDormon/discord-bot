import {Command} from "../types";
import {Collection} from "discord.js";
import Nick from "./nick";

const commands: Command[] = [Nick]

export const commandsCollection = new Collection<string, Command>()

commands.forEach(command => {
    commandsCollection.set(command.meta.name, command)
})

export default commands
