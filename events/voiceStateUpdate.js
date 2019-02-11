module.exports = (me, oldMember, newMember) => {
  console.log("le vocal a bouger !");
	if (oldMember.voiceChannelID) {
		console.log(oldMember.user.username+" a quitter "+me.guilds.get(oldMember.guild.id).channels.get(oldMember.voiceChannelID).name);
	}
	if (newMember.voiceChannelID) {
		console.log(newMember.user.username+" a rejoinds "+me.guilds.get(newMember.guild.id).channels.get(newMember.voiceChannelID).name);

	}
};
