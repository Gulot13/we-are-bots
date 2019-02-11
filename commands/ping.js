exports.run = (me, msg, args) => {
    msg.channel.send("pong!").catch(console.error);
};
