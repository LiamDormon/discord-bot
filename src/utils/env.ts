import * as dotenv from 'dotenv'
import {resolve} from "path"

const envPath = resolve(process.cwd(), "../.env")
dotenv.config({path: envPath})

export enum EnvVars {
    Token = "CLIENT_TOKEN",
    GuildId = "GUILD_ID",
    ClientId = "CLIENT_ID",
    DatabaseURL = "DATABASE_URL"
}

export const getEnvironmentVar = (key: EnvVars, fallback?: string): string | undefined  => {
    const value = process.env[key] ?? fallback;
    if (value === undefined) {
        throw new Error(`Environment variable ${key} is not set.`);
    }

    return value;
}