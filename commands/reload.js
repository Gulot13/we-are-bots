exports.run = (me, msg, args) => {
  if(!args || args.size < 1) return msg.reply("Précise quel module a reload.");
  const commandName = args[0];
  // Check if the command exists and is valid
  if(!me.commands.has(commandName)) {
    return msg.reply("Ce module n'existe pas.");
  }
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${commandName}.js`)];
  // We also need to delete and reload the command from the me.commands Enmap
  me.commands.delete(commandName);
  const props = require(`./${commandName}.js`);
  me.commands.set(commandName, props);
  msg.reply(`Le module \`${commandName}\` est reload`);
};
