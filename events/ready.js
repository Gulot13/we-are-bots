module.exports = (me, Discord) => {
  console.log(`Logged in as ${me.user.tag}!`);
  me.user.setStatus("online"); //dnd , online , ldle
  me.user.setPresence({ game: { name: `${me.config.prefix}aide || ${me.guilds.get(me.config.wagID).memberCount} membres !`, type: 0 } }); // jeu en cours
};
