const mongoose = require("mongoose");
require("./Blog")

const schema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isAccept: {
        type: Boolean,
        default: false
    },
    blogID: {
        type: mongoose.Types.ObjectId,
        ref: "Blog"
    }


}, { timestamps: true });

const model = mongoose.models.CommentBlog || mongoose.model("CommentBlog", schema);
export default model