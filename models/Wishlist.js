const mongoose = require("mongoose");
import ProductModel from "./Product"
import UserModel  from "./User"

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Wishlist || mongoose.model("Wishlist", schema);
export default model;
