/** Adapted from https://github.com/WillJeynes/NickBot 
 *  Licensed under GPL-3.0
 *  Made Awesome by Liam
 */

import { SlashCommandBuilder } from 'discord.js';
import { command } from '../utils';
import { prisma } from '..';

const meta = new SlashCommandBuilder()
    .setName("nick")
    .setDescription("Set somebody's nickname.")
    .addUserOption(option => option.setName("user").setDescription("The user to set the nickname for.").setRequired(true))
    .addStringOption(option => option.setName("nickname").setDescription("The nickname to set.").setMinLength(1).setMaxLength(32).setRequired(true));

export default command(meta, async ({interaction}) => {
    const user = interaction.options.getUser("user");
    let nickname = interaction.options.getString("nickname");

    const tgtUserId = user?.id;
    if (!tgtUserId) {
        await interaction.reply({content: "Invalid user specified.", ephemeral: true});
        return;
    }

    if (tgtUserId === interaction.user.id) {
        await interaction.reply({content: "You can't change your own nickname silly.", ephemeral: true});
        return;
    }

    const tgtMember = interaction.guild?.members.cache.get(tgtUserId);
    tgtMember?.setNickname(nickname);
    await interaction.reply({content: `Set ${user?.username}'s nickname to ${nickname}.`, ephemeral: true});

    nickname = nickname || user.username;

    const nick = await prisma.nickname.upsert({
        where: {userId: tgtUserId},
        update: {nickname},
        create: {userId: tgtUserId, nickname}
    });
    
    return;
});