const mongoose = require("mongoose")

const schema =new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    expTime: {
        type: Number,
        required: true
    },
    times: {
        type: Number,
        default: 0
    }
})

const model = mongoose.models.Otp || mongoose.model("Otp" , schema)
export default model