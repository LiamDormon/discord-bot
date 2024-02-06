import {prisma} from "../index";

export const getSetting = async <T = string>(key: string) => {
    const data = await prisma.setting.findFirst({
        where: {key}
    })

    if (!data) return null;
    if (!data.value) return null;

    return data.value as T;
}

export const setSettings = async <T = string>(k: string, v: T) => {
    return await prisma.setting.upsert({
        where: {
            key: k,
        },
        update: {
            value: v as string,
        },
        create: {
            key: k,
            value: v as string,
        },
    })
}

export const getAllSettingKeys = async (): Promise<string[]> => {
    const data = await prisma.setting.findMany()

    return data.map(_ => _.key)
}