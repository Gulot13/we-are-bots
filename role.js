const lRole = require("./data/roles.json");
const interval = 1200;
let time = 0;
exports.jeux = function (Discord, channel){
  let json = lRole.jeux;
  let embed = new Discord.RichEmbed()
    .setColor(0x900C3F)
    .addField("J E U X", strEmbedRole(json));
    channel.sendMessage({embed}).then(function (msg){
      for (let i = 0; i < json.length; i++) {
        setTimeout(function (){msg.react(json[i].info[0]);}, time);
        time = time + interval;
      }
    });
}

exports.divertissements = function (Discord, channel) {
  let json = lRole.divertissements;
  let embed = new Discord.RichEmbed()
    .setColor(0x900C3F)
    .addField("D I V E R T I S S E M E N T S", strEmbedRole(json));
    channel.sendMessage({embed}).then(function (msg){
      for (let i = 0; i < json.length; i++) {
        setTimeout(function (){msg.react(json[i].info[0]);}, time);
        time = time + interval;
      }
    });

}

exports.candidature = function (Discord, channel) {
  let json = lRole.candidature;
  let embed = new Discord.RichEmbed()
    .setColor(0x900C3F)
    .addField("C A N D I D A T U R E", strEmbedRole(json));
    channel.sendMessage({embed}).then(function (msg){
      for (let i = 0; i < json.length; i++) {
        setTimeout(function (){msg.react(json[i].info[0]);}, time);
        time = time + interval;
      }
    });
}

function strEmbedRole(list){
  let strContent = "";
  for (var i = 0; i < list.length; i++) {
    strContent = strContent + list[i].info[0];
    strContent = strContent + lRole.spe[0];
    strContent = strContent + list[i].info[1];
    strContent = strContent + lRole.spe[1];
  }
  return strContent;
}
