const gifDir = "./../data/img/gif/frame-";
const time = 200;

module.exports = (me, Discord) => {
  console.log(`Logged in as ${me.user.tag}!`);
  me.user.setStatus("online"); //dnd , online , ldle
  me.user.setPresence({ game: { name: `${me.config.prefix}aide || ${me.guilds.get(me.config.wagID).memberCount} membres !`, type: 0 } }); // jeu en cours
  //gif(me);
};

/*function gif(me) {
  for (var i = 1; i < 5; i++) {
    setTimeout(function(){me.guilds.get("516265620224868392").setIcon(gifDir+i+".gif");}, time*i);
  }
  //setTimeout(gif(), time*5);
}*/
