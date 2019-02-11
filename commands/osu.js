const authToken = require("./../data/secrets.json");
const Discord = require("discord.js");
const request = require("request");

exports.run = (me, msg, args) => {
  console.log(args);
  args = msg.content.split(' ').slice('1').join('%20')
  if (args[1]) {
    request('https://osu.ppy.sh/api/get_user?k='+authToken.osu+'&type=string&u=' + args, function (error, response, body) {
      json = body;

      data = JSON.parse(json);
      if (body.length > 2) {

        var embed = new Discord.RichEmbed()
          .setTitle(data[0].username)
          .setURL('https://osu.ppy.sh/u/' + data[0].user_id)
          .setAuthor('osu! User Info')
          .setColor(0xFF1A8C)
          .setThumbnail('https://a.ppy.sh/' + data[0].user_id)
          .addField("Level", data[0].level.substr(0, 5), true)
          .addField('Rank', '#' + data[0].pp_rank, true)
          .addField(data[0].country + ' Rank', '#' + data[0].pp_country_rank, true)
          .addField('PP', data[0].pp_raw + ' PP', true)
          .addField('Acc', (data[0].accuracy).substr(0, 5) + '%', true)
          .addField('PlayCount', data[0].playcount, true)
          .setFooter("Demandé(e) par : " + msg.author.username + " @"+me.user.username, me.user.avatarURL);

        msg.channel.send({ embed});
      } else {
        msg.channel.send("Le joueur n'existe pas.");
      }
    });
  } else {
    msg.channel.send("Il faut preciser le pseudo du joueur.");
  }
};
