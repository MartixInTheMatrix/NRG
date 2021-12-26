const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userID: {type: String, required: true},
    guildID: {type: String, required: true},
    gxp: {type: Number, default: 0},

});

module.exports = mongoose.model("User", userSchema);