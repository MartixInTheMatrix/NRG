const { Client, Intents, Collection, UserFlags } = require('discord.js')
const config = require('./util/config')
const client = new Client({intents:config.INTENTS})

client.login(config.token)
client.commands = new Collection()


const { loadEvents } = require('./startup')
const db = require('./util/db')
require("./util/functions")(client);

loadEvents(client)
db.init()
