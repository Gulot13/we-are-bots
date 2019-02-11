module.exports = (me, msg) => {

  if (msg.mentions.users.first() == me.user) {
      msg.reply("Mon prefix est: ``" + prefix + "``, si tu as besoin d'aide fais: ``" + prefix + "aide``");
  }

  // Ignore all bots
  if (msg.author.bot) return;

  // Ignore msgs not starting with the prefix (in config.json)
  if (msg.content.indexOf(me.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = msg.content.slice(me.config.prefix.length).trim().split(/ +/g);
  console.log(args);
  const command = msg.content.slice(me.config.prefix.length).trim().split(/ +/g).shift().toLowerCase();
  console.log(command);
  console.log(args);

  // Grab the command data from the me.commands Enmap
  const cmd = me.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(me, msg, args);
};
