const mongoose = require("mongoose");
//mongoose.Types.ObjectId

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  favoriteFoods: [
    {
      type: String,
      require: true,
    },
  ],
});

module.exports= mongoose.model("User", UserSchema);
