import connectToDB from "@/configs/db";
import UserModel from "@/models/User"
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { roles } from "@/utils/constants";
import { validatePhone , validateEmail ,validatePassword } from "@/utils/auth";


export async function POST(req) {

    connectToDB()

    try {
        const body = await req.json()
        const {name , phone , email , password} = body
    
        if(!name.trim()) {
            return Response.json({message: "name have not empty"} , {
                status: 400
            })
        }
    
        const isValidPhone = validatePhone(phone)
        if(!isValidPhone) {
        return  Response.json({message: "phone format is not valid"} , {
            status: 406
        })
        }

        if(email) {
            const isValidEmail = validateEmail(email)
      
            if(!isValidEmail) {
             return Response.json({message: "email is not valid"} , {
                status: 412
             })
            }
          }

          if(password) {
            const isValidPassword = validatePassword(password)
          
            if(!isValidPassword) {
             return Response.json({message: "password is not valid"} , {
                status: 409
             })
            }
          }
    
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
    
    }catch (err) {
        return Response.json({message: `enterval error server => ${err}`} , {
            status: 500
        })
    }

}
