const Discord = require("discord.js");
const request = require("request");
const cheerio = require("cheerio");

exports.run = (me, msg, args) => {
  request({
    uri: "http://www.viedemerde.fr/aleatoire",
  }, function (error, response, body) {
    var $ = cheerio.load(body);

    $(".block > a").each(function () {
      var text = $(this).text();
      if (text.length > 255 || text.length < 5) {
        console.log("vdm zapper car elle est trop longue (>255 charac) ou vide");
        return true;
      }
      var embed = new Discord.RichEmbed()
        .setTitle("Vie De Merde")
        .setURL("http://www.viedemerde.fr"+$(this).attr("href"))
        .setColor(0x32aae1)
        .setThumbnail("http://www.viedemerde.fr/images/favicon/VDM-fb-310x310.png")
        .addField("😂", text)
        .setFooter("Demandé(e) par : " + msg.author.username + " @"+me.user.username, me.user.avatarURL);
      msg.channel.send({embed});
      return false;
    });
  });
};
