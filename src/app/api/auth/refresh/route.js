import connectToDB from "@/configs/db";
import { cookies } from "next/headers";
import UserModel from "@/models/User";
import { verify } from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth";

export async function POST(req) {
  try {
    connectToDB();
    const refreshToken = cookies().get("refresh-token").value;

    if (!refreshToken) {
      return Response.json({ message: "user not authorized" }, { status: 401 });
    }

    const user = await UserModel.findOne({ refreshToken });
    
    if (!user) {
      return Response.json({ message: "not found" }, { status: 404 });
    }

    verify(refreshToken, process.env.RefreshTokenSecretKey);


    return Response.json(
      {  user },
      {
        status: 200,
      }
    );
  } catch (err) {
    return Response.json(
      { message: `interval error server for refresh => ${err}`},
      {
        status: 500,
      }
    );
  }
}
