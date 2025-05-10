const mongoose = require("mongoose")
require("./User")

const schema = mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  percent: {
    type: Number,
    required: true
  },
  maxUse: {
    type: Number,
    required: true
  },
  uses: {
    type: Number,
    default: 0
  },
  usedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User', 
    default: []
  }
}, {timestamps: true});

const model = mongoose.models.Discount || mongoose.model("Discount", schema);
export default model;
