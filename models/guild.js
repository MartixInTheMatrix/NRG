const mongoose = require("mongoose");

const guildSchema = new mongoose.Schema({
    guildID: {type: String, required: true},
    gxp: {type: Number, default: 0},
    stats: {
        type: Array,
        default: [],
        required: true
    }
});

module.exports = mongoose.model("Guild", guildSchema);
