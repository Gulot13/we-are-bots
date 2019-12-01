#!/usr/bin/env node
"use strict";
try {
	// Déclaration des fichiers du bot
		const authToken = require("./data/secrets.json"),
		config = require("./data/config.json"), // Configuration et raccourcis des appels du code
		Discord = require("discord.js"),
		roleJs = require("./exports/role.js"),
		Enmap = require("enmap"),
		fs = require("fs"),
		prefix = config.prefix,
		request = require("request"),
		mysql = require("mysql"),
		Cleverbot = require("cleverbot-node"),
		me = new Discord.Client(),
		me.config = config;


		class Database {
			constructor(config) {
				this.connection = mysql.createConnection(config);
				//this.connection.connect();
			}
			query(sql, args) {
				return new Promise((resolve, reject) => {
					this.connection.query(sql, args, (err, rows) =>{
						if (err) return reject(err);
						resolve(rows);
					});
				});
			}
			close() {
				return new Promise((resolve, reject) =>{
					this.connection.end(err => {
						if (err) return reject(err);
						resolve();
					});
				});
			}
		}
		const db = new Database({
			host: 'localhost',
			user: 'root',
			password: '',
			database: 'test',
			connectionLimit: 5
		});


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
			let chann = me.guilds.get(me.config.wagID).channels.get(me.config.cRoleID);
			chann.bulkDelete(10); // Suppression de 10 messages dans le channel(id) "config.cRoleID"
			roleJs.jeux(Discord, chann);
			roleJs.divertissements(Discord, chann);
			roleJs.candidature(Discord, chann);
			db.query("CREATE TABLE IF NOT EXSIT level (id CHAR(18) PRIMARY KEY NOT NULL, level INT,	xp INT)").then(rows => {
				console.log("creation de la table...1");
			}, err => {
				console.log("Une erreur est survenue 1: " + err);
			});
			db.query("CREATE TABLE IF NOT EXSIT calavantcmd (id CHAR(18) PRIMARY KEY NOT NULL, lastMsg TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)").then(rows => {
				console.log("creation de la table...2");
			}, err => {
				console.log("Une erreur est survenue 2: " + err);
			});
		});

		me.on('message', msg => {

		  msg.content = msg.content.toLowerCase();
			let args = msg.content.split(' ');

			if (!cooldownChat.has(msg.author.id)) {
					giveXp(msg.author.id, rdn(15, 25), msg)
					cooldownChat.add(msg.author.id);
					setTimeout(() => {
							cooldownChat.delete(msg.author.id);
				}, 60000);
			}
			if (msg.content.startsWith(prefix + "daily")) {
				db.query(`SELECT id, UNIX_TIMESTAMP(lastMsg) as lastMsg FROM calavantcmd WHERE id='${msg.author.id}'`).then(rows => {
					let day = new Date();
					let unix = Math.round((new Date()).getTime() / 1000);
					let xp = 300 * (day.getUTCDate() / 5);
					if (rows.length>0){
						if (unix - rows[0].lastMsg > 24*3600){
							msg.reply("Tu as reçu ton XP journalière.");
							giveXp(msg.author.id, xp, msg);
						} else msg.reply("La commande est autorisé une fois toute les 24h.");
					} else {
						db.query(`INSERT INTO calavantcmd (id) VALUES ('${msg.author.id}');`).then(() =>{
							msg.reply("Tu as reçu ton XP journalière.");
							giveXp(msg.author.id, xp, msg);
						});
					}
				});
			}

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

function giveXp(id, xp, msg) {
	db.query(`SELECT id, level, xp FROM level WHERE id='${id}'`).then(rows => {
		console.log(rows);
		if (rows.length>0){
			xp = xp + rows[0].xp;
			let lvl = xp >= xpOfLvl(rows[0].level+1) ? rows[0].level+1 : rows[0].level;
			if (lvl>rows[0].level) msg.channel.send(`Bien joué à toi ${msg.author.username}, tu es passé level ${lvl} ! Continue ainsi !`);
			db.query(`UPDATE level SET xp=${xp}, level=${lvl} WHERE id='${id}'`);
		} else {
			db.query(`INSERT INTO level VALUES ('${id}', 0, ${xp})`);
		}
	});
}
