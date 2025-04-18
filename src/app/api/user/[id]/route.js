import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { authAdmin } from "@/utils/authUserLink";
import { isValidObjectId } from "mongoose";


export async function DELETE(req , {params}) {

    try {
      connectToDB()

      const admin = await authAdmin();
      if (!admin) {
        return Response.json(
          { message: "this route is protected" },
          {
            status: 401,
          }
        );
      }

      const id = params.id;

      if(!id) {
        return Response.json({message: "must send one id"} , {
          status: 400
        })
      }

      if(!isValidObjectId(id)) {
        return Response.json({message: "id is not valid"} , {
          status: 422
        })
      }

      const user = await UserModel.findOne({_id: id})

      if(!user) {
        return Response.json({message: "user not found"} , {
          status: 404
        })
      }
      
      await UserModel.findOneAndDelete({_id: id})
  
      return Response.json({message: "success" })
    } catch (err) {
      return Response.json({message: `interval error server ${err}`} , {
        status: 500
      })
    }
  
  }


  export async function POST(req , {params}) {
    try {
      connectToDB();

      const admin = await authAdmin();
      if (!admin) {
        return Response.json(
          { message: "this route is protected" },
          {
            status: 401,
          }
        );
      }

      const id = params.id;
      const body = await req.json()
      const {name , email , phone} = body

      if(!id) {
        return Response.json({message: "must send one id"} , {
          status: 400
        })
      }

      if(!isValidObjectId(id)) {
        return Response.json({message: "id is not valid"} , {
          status: 422
        })
      }

      const user = await UserModel.findOne({_id: id})

      if(!user) {
        return Response.json({message: "user not found"} , {
          status: 404
        })
      }
      
  
      await UserModel.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            email,
            phone,
          },
        }
      );
  
      return Response.json(
        { message: "user-info updated successfully" },
        {
          status: 200,
        }
      );
    } catch (err) {
      return Response.json({ message: err }, { status: 500 });
    }
  }
  