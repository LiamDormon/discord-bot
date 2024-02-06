import {event} from "../utils";
import {Events} from "discord.js";
import {commandsCollection} from "../commands";

export default event<Events.InteractionCreate>(Events.InteractionCreate, async (
    {
        log,
        client
    },
    interaction
) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commandsCollection.get(interaction.commandName)
    if (!command) {
        console.error(`No command matching ${interaction.commandName} found`)
        return;
    }

    const props = {
        client,
        interaction,
        log: (...args: unknown[]) =>
            console.log(`[${interaction.commandName}]`, ...args)
    }
    try {
        await command.exec(props)
    } catch (e) {
        props.log(e)
    }
})