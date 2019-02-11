const Discord = require("discord.js");
const request = require("request");

exports.run = (me, msg, args) => {
  if (args[1] === "pc" || args[1] === "xbl" || args[1] === "psn") {
    if (args[2]) {
      var player = args[2].replace("#", "-");
      request('http://ow-api.herokuapp.com/profile/' + args[1] + '/global/' + player, function (error, response, body) {
        if (body.length > 20) {
          data = JSON.parse(body);
          if (data.playtime.quickplay == null) {
            tpsQuick = 0
          } else if (data.playtime.quickplay !== "null") {
            tpsQuick = data.playtime.quickplay.replace("hours", "");
          }
          if (data.playtime.competitive == null) {
            tpsRank = 0
          } else if (data.playtime.competitive !== "null") {
            tpsRank = data.playtime.competitive.replace("hours", "");
          }
          var embed = new Discord.RichEmbed()
            .setTitle(data.username)
            .setURL("https://www.overbuff.com/players/" + args[1] + "/" + player)
            .setAuthor("Overwatch User Info")
            .setColor(0xff8d07)
            .setThumbnail(data.portrait)
            .addField('level', data.level)
            .addField('Partie(s) rapide gagne(s)', data.games.quickplay.won)
            .addField('Partie(s) ranked gagne(s)', data.games.competitive.won)
            .addField('Partie(s) ranked perdu(s)', data.games.competitive.lost)
            .addField('Total des parties ranked', data.games.competitive.played)
            .addField('Rang', data.competitive.rank)
            .addField('Temps joue en partie rapide', tpsQuick+" heure(s)")
            .addField('Temps total joue en ranked', tpsRank+" heure(s)")
            .setFooter("Demandé(e) par : " + msg.author.username + " @"+me.user.username, me.user.avatarURL);
          msg.channel.send({ embed});
        } else {
          msg.channel.send("Pseudo introuvable");
        }
      });
    } else {
      msg.channel.send("Tu n'a pas mis de __joueur__.");
    }
  } else {
    msg.channel.send("Tu dois mettre ta __plateforme__: **pc, xbl ou psn**");
  }
};
