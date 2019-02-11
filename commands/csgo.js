const Discord = require("discord.js");
const request = require("request");
const authToken = require("./../data/secrets.json");
exports.run = (me, msg, args) => {
  if (args[1].length !== 17) {
    msg.channel.send("SteamID incorrect.");
    log(msg, msg.author.username);
    return;
  }
  request('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+authToken.steam+'&steamids=' + args[1], function (error, response, PlayerSummaries) {
    dataPlayerSummaries = JSON.parse(PlayerSummaries);
    request('https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key='+authToken.steam+'&steamid=' + args[1], function (error, response, StatsCS) {
      try {
        if (StatsCS.length > 30) {
          var dataStatsCS = JSON.parse(StatsCS);
          console.log(searchJSON(dataStatsCS.playerstats.stats, "total_kills", 200));
          var embed = new Discord.RichEmbed()
            .setTitle(dataPlayerSummaries.response.players[0].personaname)
            .setURL(dataPlayerSummaries.response.players[0].profileurl)
            .setAuthor("CS:GO User Info")
            .setColor(0xd45500)
            .setThumbnail(dataPlayerSummaries.response.players[0].avatarfull)
            .addField("Kill(s) total", searchJSON(dataStatsCS.playerstats.stats, "total_kills", 200), true)
            .addField("Mort(s) Total", searchJSON(dataStatsCS.playerstats.stats, "total_deaths", 200), true)
            .addField("Temps en jeu", parseInt(searchJSON(dataStatsCS.playerstats.stats, "total_time_played", 200)/60/60)+" heures", true)
            .addField("Win(s) total", searchJSON(dataStatsCS.playerstats.stats, "total_wins", 200),true)
            .addField("Headshot total", searchJSON(dataStatsCS.playerstats.stats, "total_kills_headshot", 200))
            .setFooter("Demandé(e) par : " + msg.author.username + " @"+me.user.username, me.user.avatarURL);
          msg.channel.send({ embed});
        }
      } catch (err) {
              msg.channel.send("Oups ! Une erreur s'est produite... C'est sûrement car ton profil est en privé, vérifie ca et réessaye dans une dixaine de minutes.");
        msg.channel.send("ERREUR: ``error 500: Internal Server Error (No data found)``");
              console.log("ERREUR: "+err);
          }
    });
  });
};
