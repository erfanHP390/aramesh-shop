import connectToDB from "@/configs/db";
import { authUser } from "@/utils/authUserLink";
import WishlistModel from "@/models/Wishlist"
import { isValidObjectId } from "mongoose";


export async function DELETE(req, {params}) {    

    
    try {

        connectToDB()

        const id= params.id

        const user = await authUser()

        if(!user) {
            return Response.json({message: "user not authorized"} , {
                status: 401
            })
        }

        if(!id) {
            return Response.json({message: "id must sent"} , {
                status: 400
            })
        }


        await WishlistModel.findOneAndDelete({_id : id})

        return Response.json({message: "removed form wishlist successfully"})
      } catch (err) {
        return Response.json(
          { message: err },
          {
            status: 500,
          }
        );
      }

}