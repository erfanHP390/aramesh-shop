import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User"


export async function GET(req) {
    connectToDB()
  
    const token = cookies().get("token")
    let user = null
  
    if (token) {
      const tokenPayload = verifyToken(token.value);
      if (tokenPayload) {
        user = await UserModel.findOne({ email: tokenPayload.email } , "-password  -refreshToken  -__v");
      }


      return Response.json(user)
    } else {
        return Response.json({data: null , message: "not access !!!"} , {
            status: 401
        })
    }


}

