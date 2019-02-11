const nsfFile = require("./../data/nsf.json"); // Blague du site: http://nuitsansfolie.com/
const Discord = require("discord.js");

exports.run = (me, msg, args) => {
  let nsfID = Math.floor(Math.random() * (nsfFile.nsf.length - 0 + 1) + 0)
  var embed = new Discord.RichEmbed()
    .setTitle("Nuit Sans Folie")
    .setURL("http://nuitsansfolie.com/nsf/"+nsfFile.nsf[nsfID].id)
    .setColor(0xF7346B)
    .setThumbnail("http://nuitsansfolie.com/images/template/logo.png")
    .addField("<:Jscared2:348481825401733141>", nsfFile.nsf[nsfID].text)
    .setFooter("Demandé(e) par : " + msg.author.username + " @"+me.user.username, me.user.avatarURL);
  msg.channel.send({embed});
};
