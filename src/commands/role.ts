import { ColorResolvable, Colors, SlashCommandBuilder } from 'discord.js';
import { command } from '../utils';
import { prisma } from '..';

const meta = new SlashCommandBuilder()
    .setName("role")
    .setDescription("Create or modify a custom role.")
    .addStringOption(option => option.setName("name").setDescription("Role Name.").setMinLength(1).setMaxLength(32).setRequired(true))
    .addStringOption(option => 
        option
            .setName("color")
            .setDescription("Role Color.")
            .setChoices(
                {name: "Default", value: "Default"},
                {name: "White", value: "White"},
                {name: "Aqua", value: "Aqua"},
                {name: "Green", value: "Green"},
                {name: "Blue", value: "Blue"},
                {name: "Yellow", value: "Yellow"},
                {name: "Purple", value: "Purple"},
                {name: "LuminousVividPink", value: "LuminousVividPink"},
                {name: "Fuchsia", value: "Fuchsia"},
                {name: "Gold", value: "Gold"},
                {name: "Orange", value: "Orange"},
                {name: "Red", value: "Red"},
                {name: "Grey", value: "Grey"},
                {name: "Navy", value: "Navy"},
                {name: "DarkAqua", value: "DarkAqua"},
                {name: "DarkGreen", value: "DarkGreen"},
                {name: "DarkBlue", value: "DarkBlue"},
                {name: "DarkPurple", value: "DarkPurple"},
                {name: "DarkVividPink", value: "DarkVividPink"},
                {name: "DarkGold", value: "DarkGold"},
                {name: "DarkOrange", value: "DarkOrange"},
                {name: "LightGrey", value: "LightGrey"},
                {name: "DarkGrey", value: "DarkGrey"},
                {name: "Greyple", value: "Greyple"},
                {name: "Blurple", value: "Blurple"},
            )

    )

export default command(meta, async ({interaction}) => {
    const name = interaction.options.getString("name");
    const colour = interaction.options.getString("color");

    if (!name) {
        await interaction.reply({content: "Invalid name specified.", ephemeral: true});
        return;
    }

    if (!colour) {
        await interaction.reply({content: "Invalid color specified.", ephemeral: true});
        return;
    }

    const userId = interaction.user.id;

    // Check if the user already has a custom role
    const role = await prisma.role.findFirst({
        where: {
            userId: userId
        }
    });

    let roleId = role?.id;

    if (role) {
        const roleId = role.id;

        // Update the role
        interaction.guild?.roles.cache.get(roleId)?.edit({
            name: name,
            color: colour as ColorResolvable
        });

        await interaction.reply({content: `Updated role ${name} with color ${colour}.`, ephemeral: true});
    } else {
        // Create the role
        const newRole = await interaction.guild?.roles.create({
            name: name,
            color: colour as ColorResolvable
        });

        roleId = newRole?.id as string;

        interaction.guild?.members.cache.get(userId)?.roles.add(newRole?.id as string);
    }

    await prisma.role.upsert({
        where: {id: roleId},
        update: {name},
        create: {id: roleId!, userId, name}
    });
});