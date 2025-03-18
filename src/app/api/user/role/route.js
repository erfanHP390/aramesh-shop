import connectToDB from "@/configs/db"
import UserModel from "@/models/User"
import { isValidObjectId } from "mongoose"

export async function PUT(req) {

    try {
        connectToDB()

        const body = await req.json()
        const {id} = body


            if (!isValidObjectId(id)) {
              return Response.json(
                { message: "ID is not valid" },
                {
                  status: 422,
                }
              );
            }


        const user = await UserModel.findOne({_id: id}).lean()

        if(!user) {
            return Response.json({message: "user not found"} , {
                status: 404
            })
        }

        await UserModel.findOneAndUpdate({_id: id} , {
            $set: {
                role: user.role === "USER" ? "ADMIN" : "USER"
            }
        })

        return Response.json({message: "user is role changed successfully"})


    } catch(err) {
        return Response.json({message: err} , {
            status: 500
        })
    }

}
