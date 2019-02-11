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
  if (reaction.message.channel.id == me.config.cRoleID) {
    if (user.id !== me.user.id){
      if (testRole(reaction.emoji.name) !== "none") {
        let guild = reaction.message.guild;
        guild.members.get(user.id).removeRole(guild.roles.get(testRole(reaction.emoji.name)));
      }
    }
  }
};
