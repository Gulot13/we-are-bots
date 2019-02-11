const lRole = require("./../data/roles.json");

function testRole(emote) {
  for (var i = 0; i < lRole.jeux.length; i++) {
    if (emote == lRole.jeux[i].info[0]) {
      return lRole.jeux[i].info[2];
    }
  }
  for (var i = 0; i < lRole.divertissements.length; i++) {
    if (emote == lRole.divertissements[i].info[0]) {
      return lRole.divertissements[i].info[2];
    }
  }
  return "none";
}

module.exports = (me, reaction, user) => {
  if (reaction.message.channel.id == me.config.cRoleID) { // si la react est dans le channel(id) "config.cRoleID"
    if (user.id !== me.user.id){ // si c'est pas le bot qui ajoute la react
      if (testRole(reaction.emoji.name) !== "none") { // Si c'est une reaction correct
        let guild = reaction.message.guild;
        guild.members.get(user.id).addRole(guild.roles.get(testRole(reaction.emoji.name))); // ajoute le role
      } else if (testRole(reaction.emoji.name) == "none") { // Sinon
        for (var i = 0; i < lRole.candidature.length; i++) {
          if (reaction.emoji.name === lRole.candidature[i].info[0]) {
            reaction.message.guild.members.get(user.id).send("Salut " + user.username + ", Tu as demandé le rôle " + lRole.candidature[i].info[1] + ".\n" + lRole.candidature[i].msg).then(function (msg) {
              setTimeout(function () { msg.delete(); }, 15000);
            });
          }
        }
        reaction.remove(user); // Supprime la réaction
      }
    }
  }
};
