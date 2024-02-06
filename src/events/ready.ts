import {event} from "../utils";
import {Events} from "discord.js";

export default event<Events.ClientReady>(Events.ClientReady, ({log}, client) => {
    log(`Logged in as ${client.user.tag}`)
})