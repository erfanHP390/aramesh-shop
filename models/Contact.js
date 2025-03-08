const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: false,
      default: "self"
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.models.Contact || mongoose.model("Contact", schema);
export default model;
