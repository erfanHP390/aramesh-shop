const mongoose = require("mongoose");
require("./Comment");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    shortDesc: {
      type: String,
      required: true,
    },
    longDesc: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    suitableFor: {
      type: String,
      required: true,
    },
    smell: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 5,
    },
    tags: {
      type: [String],
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    uses: {
      type: Number,
      default: 0,
    },
    comments: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Comment",
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.models.Product || mongoose.model("Product", schema);

export default model;
