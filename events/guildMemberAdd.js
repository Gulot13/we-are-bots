module.exports = (me, member) => {
  var embed = new Discord.RichEmbed()
    //.setTitle("Bienvenue sur <:wag:461656057572360193>")
    .setURL("https://discord.gg/MU6Dgsr")
    .setColor(0x900C3F)
    .setThumbnail()
    .addField("Bienvenue sur <:wag:461656057572360193>", "Nous espérons que tu vas t'amuser\nSoit sûr de lire le channel <#416478130614697994>")
    .addField("__Nous avons quelques liens utiles__", "Invite tes amis: https://discord.gg/Dm7cwsD\nNotre chaine Youtube: https://youtu.be/IbIx4vRfHLs")
    .setFooter("@"+me.user.username, me.user.avatarURL);
  member.send({embed});
  console.log('nouveau!');
};
