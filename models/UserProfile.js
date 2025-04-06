const mongoose = require("mongoose");
require("./User");

const schema = mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const model =
  mongoose.models.UserProfile || mongoose.model("UserProfile", schema);
export default model;
