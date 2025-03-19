const mongoose = require("mongoose")

const schema = mongoose.Schema({

    code: {
        type: String,
        required: true
    },
    percent: {
        type: String,
        required: true
    },
    maxUse: {
        type: String,
        required: true
    },
    uses: {
        type: String,
        required: true
    },

} , {timestamps: true})

const model = mongoose.models.Discount || mongoose.model("Discount" , schema)
export  default model