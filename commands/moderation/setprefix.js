const db = require('quick.db');

module.exports = {
    config: {
        name: "setprefix",
        aliases: ['sp', 'prefix'],
        category: "moderation",
        description: "Sets Custom Prefix",
        usage: "[prefix]",
        accessableby: 'Administrators'
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**<a:deny:892076004183506954> You Do Not Have Sufficient Permissions! - [ADMINISTRATOR]**")

        if (!args[0]) {
          let b = await db.fetch(`prefix_${message.guild.id}`);
          if (b) {
        return message.channel.send(
          `**Prefix Of This Server is \`${b}\`**`
        );
      } else return message.channel.send("**<a:deny:892076004183506954> Please Enter A Prefix To Set!**");
    } 
      
        try {

            let a = args.join(' ');
            let b = await db.fetch(`prefix_${message.guild.id}`)

            if (a === b) {
                return message.channel.send('**<a:deny:892076004183506954> This is Already The Server Prefix!**')
            } else {
                db.set(`prefix_${message.guild.id}`, a.toLowerCase())

                return message.channel.send(`**<a:check:892071687250673664> Successfuly Set Server Prefix To \`${a}\`**`)
            }
        } catch (e) {
            console.log(e)
        }
    }
}