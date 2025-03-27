const mongoose = require("mongoose");

const schema = mongoose.Schema({
    
    titr: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    }

}, { timestamps: true });

const model = mongoose.models.Blog || mongoose.model("Blog", schema);
export default model