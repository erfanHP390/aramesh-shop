const mongoose = require("mongoose");

const schema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        default: "www.ir"
    },
    description: {
        type: String,
        required: true
    },
    isAccept: {
        type: Boolean,
        default: false
    },


}, { timestamps: true });

const model = mongoose.models.CommentBlog || mongoose.model("CommentBlog", schema);
export default model