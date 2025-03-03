import connectToDB from "@/configs/db";
import UserModel from "@/models/User"
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { roles } from "@/utils/constants";

export async function POST(req) {

    connectToDB()

    const body = await req.json()
    const {name , phone , email , password} = body

    const isUserExist = await UserModel.findOne({
        $or: [{name} , {email} , {phone}]
    })

    if(isUserExist) {
        return Response.json({message: "the username or email or phone is already exist"} , {
            status: 422
        })
    }

    const hashedPassword = await hashPassword(password)
    const accessToken = generateAccessToken({name})

    const users = await UserModel.find({})

    await UserModel.create({
        name,
        phone,
        email,
        password: hashedPassword,
        role: users.length > 0 ? roles.USER : roles.ADMIN
    })

    return Response.json({message: "user signed up is successfully"} , {
        status: 201,
        headers: {
            "Set-Cookie": `token=${accessToken};path=/;httpOnly=true`
        }
    })

}
