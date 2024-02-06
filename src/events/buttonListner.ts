import {event} from "../utils";
import {Events} from "discord.js";

export default event<Events.InteractionCreate>(Events.InteractionCreate, async (
    {client},
    interaction
) => {
    if (!interaction.isButton()) return;
    if (!interaction.customId) return;


})