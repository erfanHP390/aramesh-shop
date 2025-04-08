import connectToDB from "@/configs/db";
import { hashPassword, validatePassword } from "@/utils/auth";
import UserModel from "@/models/User"


export async function POST(req) {
    try {
        connectToDB()

        const body = await req.json()
        const {id , password} = body

        if(!password) {
            return Response.json({message: "please send your new password"} , {
                status: 400
            })
        }

        const isValidPassword = validatePassword(password)
        if(!isValidPassword) {
            return Response.json({message: "password is not valid"} , {
                status: 422
            })
        }

        const isExistPassword = await UserModel.findOne({_id: id})
        if(!isExistPassword) {
            return Response.json({message: "user is not found"} , {
                status: 404
            })
        }

        const hashedPassword =await hashPassword(password)


        await UserModel.findOneAndUpdate({_id: id} , {
            $set: {
                password: hashedPassword
            }
        })

        return Response.json({message: "password is changed successfully"})

    } catch (err) {
        return Response.json(
          { message: `interval error server for create product => ${err}` },
          {
            status: 500,
          }
        );
      }
}
