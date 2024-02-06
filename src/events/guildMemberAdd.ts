import {event} from "../utils";
import {Events} from "discord.js";
import {prisma} from "..";

export default event<Events.GuildMemberAdd>(Events.GuildMemberAdd, async (
    {client},
    interaction
) => {
    // Check if the user has a nickname in the database
    // If they do, set their nickname to that

    const user = interaction.user;
    const tgtUserId = user.id;

    const nickname = await prisma.nickname.findFirst({
        where: {
            userId: tgtUserId
        }
    });

    if (!nickname) return;

    const tgtMember = interaction.guild?.members.cache.get(tgtUserId);
    tgtMember?.setNickname(nickname.nickname);
})