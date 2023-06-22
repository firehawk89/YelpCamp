const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

userSchema.plugin(passportLocalMongoose); // include fields for username and password

module.exports = model("User", userSchema);
