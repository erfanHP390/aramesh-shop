import connectToDB from "@/configs/db";
import { validateEmail, validatePhone } from "@/utils/auth";
import BanModel from "@/models/Ban"

export async function POST(req) {

    connectToDB()

    try {

        const body =await req.json()
        const {email , phone} = body
        
        // if(!email || !phone) {
        //     return Response.json({message: "one field must fill"} , {
        //         status: 400
        //     })
        // }

        const isValidEmail = validateEmail(email)
        if(!isValidEmail) {
            return Response.json({message: "email is not valid"} , {
                status: 422
            })
        }

        const isValidPhone = validatePhone(phone)
        if(!isValidPhone || !isValidEmail) {
            return Response.json({message: "phone is not valid"} , {
                status: 422
            })
        }

        await BanModel.create({email , phone})

        return Response.json({message: "user banned successfully"} , {
            status: 200
        })
    } catch(err) {
        return Response.json({message: `interval error server ${err}`} , {
            status: 500
        })
    }

}

