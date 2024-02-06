import {EnvVars, getEnvironmentVar, registerEvents} from "./utils";
import {Client, GatewayIntentBits} from "discord.js"
import {PrismaClient} from '@prisma/client'
import events from "./events";


export const prisma = new PrismaClient()

export const discordClient = new Client({intents: [GatewayIntentBits.Guilds]})

registerEvents(discordClient, events)

discordClient.login(getEnvironmentVar(EnvVars.Token))