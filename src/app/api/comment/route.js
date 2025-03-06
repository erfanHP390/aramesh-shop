import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment"
import ProductModel from "@/models/Product"


export async function POST(req) {

    connectToDB()

    try {

        const reqBody = await req.json()
        const {username, body,email, score , productID} = reqBody

        

        const comment = await CommentModel.create({username, body,email, score , productID})

        const updatedProduct = await ProductModel.findOneAndUpdate({_id: productID} , {
            $push: {
                comments: comment._id
            }
        })


        return Response.json({message: "comment is created successfully"} , {status: 201})

    } catch (err) {
        return Response.json({message : `interval error server create comment => ${err}`} , {
            status: 500
        })
    }

}

export async function GET () {
    connectToDB()

    const comments = await CommentModel.find({} , "-__v")

    return Response.json(comments)

}
