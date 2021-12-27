const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildID: {type: String, required: true},
    gxp: {type: Number, default: 0},
    stats: {
        type: Array,
        default: [],
        required: true
    },
    modmailID: {type: String, required: false},
    captcha: {type:Boolean, required: false},
    bvnID: {type:String, required: false}
});

module.exports = mongoose.model("Guild", guildSchema);
