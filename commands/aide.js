const Discord = require("discord.js");

exports.run = (me, msg, args) => {
  // Création des messages Embed

  var embed = new Discord.RichEmbed()
    .setTitle("Divertissements")
    .setColor(0x900C3F)
    .addField(me.config.prefix+"vdm", "Affiche une VDM aléatoire")
    .addField(me.config.prefix+"nsf", "Affiche une NSF aléatoire")
    .setFooter("Demandé(e) par : " + msg.author.username + " @"+me.user.username, me.user.avatarURL);
  msg.channel.send({embed}); // Envoi du message

  var embed = new Discord.RichEmbed()
    .setTitle("Stats")
    .setColor(0x900C3F)
    .addField(me.config.prefix+"osu <joueur>", "Pour avoir les stats de tes joueurs favoris !")
    .addField(me.config.prefix+"overwatch <plateforme: pc, xbl, psn> <joueur>", "Pour avoir les stats de tes joueurs favoris !")
    .addField(me.config.prefix+"csgo <steam id>", "Pour utiliser cette fonction il faut que le profil sont TOTALEMENT en public (si tu viens de le faire attends une dixaine de minutes")
    .setFooter("Demandé(e) par : " + msg.author.username + " @"+me.user.username, me.user.avatarURL);
  msg.channel.send({embed});

  var embed = new Discord.RichEmbed()
    .setTitle("Role")
    .setColor(0x900C3F)
    .addField(me.config.prefix+"role liste", "affiche la liste des roles")
    .addField(me.config.prefix+"role ajouter <ID du role>", "Pas besoin que je m'explique...")
    .addField(me.config.prefix+"role retirer <ID du role>", "idem")
    .setFooter("Demandé(e) par : " + msg.author.username + " @"+me.user.username, me.user.avatarURL);
  msg.channel.send({embed});
  //log(msg, msg.author.username); // appel de la fonction l
};
