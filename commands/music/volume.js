module.exports = {
    config: {
        name: 'volume',
        aliases: ["vol"],
        category: "music",
        description: 'Shows and changes volume.',
        usage: ', vol [volume]',
        accessableby: "everyone"
    },
    run: async (bot, message, args, ops) => {
        const { channel } = message.member.voice;
        if (!channel) return message.channel.send('<a:deny:892076004183506954> I\'m sorry but you need to be in a voice channel to change volume!');
        if (message.guild.me.voice.channel !== message.member.voice.channel) {
            return message.channel.send("**<a:deny:892076004183506954> You Have To Be In The Same Channel With The Bot!**");
          }
        const serverQueue = ops.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('<a:deny:892076004183506954> There is nothing playing.');
        if (!args[0]) return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
      try {
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
        return message.channel.send(`<a:check:892071687250673664> I have set the volume to **${args[0]}**`);
      } catch {
          return message.channel.send('**<a:deny:892076004183506954> Something Went Wrong!**');
      }
    }
};