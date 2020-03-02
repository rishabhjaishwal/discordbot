const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, search, meet, BOT_NAME, TOKEN } = require('./config.json');
const {emojiConverter} = require('./commands/emojiConverter');
const {searchApi, recentApi} = require('./commands/searchGoogle');

client.once('ready', () => {
    // emojiConverter("### Ready to manage discord server  ###").then(console.log);
    emojiConverter("### Created By  Rishabh Jaishwal 👍 ###").then(console.log);
});

client.on('message',async  message => {
   var  command = message.content.replace(" ","###").split('###');
   if(message.author.username !== BOT_NAME) {
    if (command[0].toLowerCase() === `${prefix}${search}` ) {
        if(command[1] !== undefined){
            let searchedData = await searchApi(command[1]);
            message.channel.send(searchedData);
        } else {
            message.channel.send("!google <searchKeyword>");
        }
    } else if(meet.includes(command[0].toLowerCase())) {
        message.channel.send(emoji.h + emoji.e + emoji.y);
    } else if(command[0] === 'command') {
        message.channel.send(await emojiConverter("Commands"));
        message.channel.send("1: !google <searchKeyword>");
        message.channel.send("2: !recent <searchKeyword>");
    } else if(command[0].toLowerCase() === '!recent') {
        if(command[1]) {
            let recentData = await recentApi(command[1],`${prefix}${search}`,message);
            message.channel.send(recentData);
        }
    }
     else if(command[0]) {
        message.channel.send("I'm really a dumbo bot");
    }
}
});

client.login(TOKEN);
