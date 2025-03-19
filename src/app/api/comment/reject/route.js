import connectToDB from "@/configs/db"
import CommentModel from "@/models/Comment"
import { isValidObjectId } from "mongoose"

export async function PUT(req) {

    try {
        connectToDB()

        const body = await req.json()
        const {id} = body

        if(!id) {
            return Response.json({message: "id have send"} , {
                status: 400
            })
        }

        if(!isValidObjectId(id)) {
            return Response.json({message: "id is not valid"} , {
                status: 422
            })            
        }

        await CommentModel.findOneAndUpdate({_id: id} , {
            $set: {
                isAccept: false
            }
        })

        return Response.json({message: "is accepted by admin successfully"})

    } catch (err) {
        return Response.json({message: `interval error server => ${err}`} , {
            status: 500
        })
    }

}

