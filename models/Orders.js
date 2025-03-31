const mongoose = require("mongoose")
require("./Product")

const schema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    company: {
        type: String,
        default: "فاقدشرکت"
    },
    province: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postCode: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "فاقد توضیحات"
    },
    totalPrice: {
        type: Number,
        required: true
    },
    postPrice: {
        type: Number,
        required: true
    },
    Basket: {
        type: Array,
        required: true
    },
    products: {
        type: [{
            type: mongoose.Types.ObjectId,
            ref: "Product"
        }],
    },
} , {timestamps: true})

const model = mongoose.models.Orders || mongoose.model("Orders" , schema)
export default model