#!/usr/bin/env node
try {
	// Déclaration des fichiers du bot
	const authToken = require("./data/secrets.json"),
		config = require("./data/config.json"), // Configuration et raccourcis des appels du code
		Discord = require("discord.js"),
		roleJs = require("./role.js"),
		Enmap = require("enmap"),
		fs = require("fs"),
		prefix = config.prefix,
		request = require("request"),
		//mysql = require("mysql"),
		Cleverbot = require("cleverbot-node"),
		me = new Discord.Client();
		me.config = config;


		/*try {
			const BotDb = mysql.createConnection({
				host: authToken.db.host,
				user: authToken.db.user,
				password: authToken.db.password,
				database: authToken.db.database
			});
		} catch (e) {
			ErreurTryCatch(e, "Connection a la base de donnée")
		}*/

		// exemple pris sur https://anidiots.guide/first-bot/a-basic-command-handler

		fs.readdir("./events/", (err, files) => {
		  if (err) return console.error(err);
		  files.forEach(file => {
		    const event = require(`./events/${file}`);
		    let eventName = file.split(".")[0];
		    me.on(eventName, event.bind(null, me));
		  });
		});

		me.commands = new Enmap();

		fs.readdir("./commands/", (err, files) => {
		  if (err) return console.error(err);
		  files.forEach(file => {
		    if (!file.endsWith(".js")) return;
		    let props = require(`./commands/${file}`);
		    let commandName = file.split(".")[0];
		    console.log(`Attempting to load command ${commandName}`);
		    me.commands.set(commandName, props);
		  });
		});

		me.on('ready', () => {
			chann = me.guilds.get(me.config.wagID).channels.get(me.config.cRoleID);
			chann.bulkDelete(10); // Suppression de 10 messages dans le channel(id) "config.cRoleID"
			roleJs.jeux(Discord, chann);
			roleJs.divertissements(Discord, chann);
			roleJs.candidature(Discord, chann);
		});

		me.on('message', msg => {

		  msg.content = msg.content.toLowerCase();
			let args = msg.content.split(' ');

		  /*=======================================
			=======        Partenariat        =======
			=========================================*/
			    if (msg.content.startsWith(prefix + "apartenariat") || msg.content.startsWith(prefix + "apart") || msg.content.startsWith(prefix + "addpartenariat") || msg.content.startsWith(prefix + "addpart" )) {
			        if (msg.member.roles.has("346422844671918090")) {
			            if (msg.content.startsWith(prefix + "apartenariat") || msg.content.startsWith(prefix + "apart")) {
			                let channelPart = msg.channels.get(config.cPartID);
			                channelPart.send({ file: "https://cdn.discordapp.com/attachments/498748336598286348/498748527724199936/partenariatsdva.png" });
			                var embed = new Discord.RichEmbed()
			                    .setTitle("Partenariat")
			                    .addField("Bienvenue sur le salon des partenaires.", "C'est ici que vous pourrez retrouver les serveurs avec lesquels nous sommes en partenariat. Si vous �tes int�ress� � devenir un serveur partenaire, veuillez respecter ces quelques conditions.")
			                    .addField("- Serveur de qualit� avec du personnel non abusif.\n- 50 membres en ligne en moyenne chaque jour.\n- Communaut� accueillante et active.\n- Serveur non bas� sur le NSFW\n\nFaire une demande.", "Si vous souhaitez postuler, veuillez mp le bot avec la commande: ``--partenariat``")
			                    .setColor(0x4194F2);
			                setTimeout(function () { channelPart.send({ embed }); }, 500);
			                log(msg, msg.author.username);
			            }

		            // CHANGER les arg "--" pour ca: prendre tout les args puis retir� les premier args et garder le text
		            if (msg.content.startsWith(prefix + "addpartenariat") || msg.content.startsWith(prefix + "addpart")) {
		                const cmdArgs = msg.content.split('--');
		                if (cmdArgs[2] && cmdArgs[3] && cmdArgs[4] && cmdArgs[5] && cmdArgs[6]) {
		                    console.log("deuxieme arg");
		                    let channelServ = msg.guild.channels.get(config.cPartID);
		                    var embed = new Discord.RichEmbed()
		                        .setTitle("Partenariat")
		                        .addField(cmdArgs[2], cmdArgs[4])
		                        .setFooter("Merci a " + cmdArgs[3] + "du partage")
		                        .setURL(cmdArgs[5])
		                        .setThumbnail(cmdArgs[6])
		                        .setColor(0x4194F2);
		                    channelServ.send({ embed });
		                }
		            }
		        }
		    }

		    if (msg.content.startsWith(prefix + "partenariat")) {
		        if (msg.channel.type === "dm") {
		            me.guilds.get(config.wagID).channels.get(config.cDemandePartID).send("<@&346422844671918090> <@" + msg.author.id + "> veut faire une pub/partenariat. Merci de le contacter");
		            msg.channel.send("La demande a été envoyé au staff, ils vont vous contacter.").then(function (msg) {
		                setTimeout(function () { msg.delete(); }, 15000);
		            });
		            log(msg, msg.author.username)
		        }
		    }

			/*=======================================
			=======           Aide           =======
			=========================================*/

		    // Appel du bot

		    if (msg.mentions.users.first() == me.user) {
		        msg.reply("Mon prefix est: ``" + prefix + "``, si tu as besoin d'aide fais: ``" + prefix + "aide``");
		        log(msg, msg.author.username);
		    }
		});

		me.login(authToken.discord);
} catch (e) {
	console.log("il a eu une erreur avec les paquets.\nPlus de détails ci-dessous");
	console.log(e);
	process.exit(1);
}

function ErreurTryCatch (erreur, operation) {
	console.log("Une s'est erreur produite erreur lors de l'opération: "+operation+".\nPlus de détails ci-dessous");
	console.log(erreur);
	process.exit(1);
}
