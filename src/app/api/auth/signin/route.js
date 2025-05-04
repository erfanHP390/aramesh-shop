import { generateAccessToken, generateRefreshToken, validateEmail, validatePassword, verifyPassword } from "@/utils/auth"
import UserModel from "@/models/User"
import connectToDB from "@/configs/db"
import BanModel from "@/models/Ban"


export async function POST(req) {

    connectToDB()

    try {
        const body =await req.json()
        const {email , password , userRefreshToken} = body


        if(email && password) {

            const isValidEmail = validateEmail(email)
    
            if(!isValidEmail) {
                return Response.json({message: "email or password is invalid"} , {
                    status: 419
                })
            }
    
            const banEmail = await BanModel.findOne({email})
    
            if(banEmail) {
                return Response.json({message: "email is banned"} , {
                    status: 403
                })
            }
        
            const user = await UserModel.findOne({email})
        
            if(!user) {
                return Response.json({message: "user not found"} , {status: 404})
            }
        
            const isCorrectPasswordWithHash =await verifyPassword(password, user.password);
    
            if (!isCorrectPasswordWithHash) {
              return Response.json(
                { message: "Email or password is not correct" },
                { status: 401 }
              );
            }
        
            const accessToken = generateAccessToken({email})
            const refreshToken = generateRefreshToken({email})
    
            await UserModel.findOneAndUpdate({email} , {
                $set: {
                    refreshToken
                }
            })
    
            const headers = new Headers()
            headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true`)
            headers.append("Set-Cookie", `refresh-token=${refreshToken};path=/;httpOnly=true`)
    
        
            return Response.json({message: "user logged in successfully"} , {
                status: 200,
                headers
            })
        } else if(userRefreshToken) {

            const user = await UserModel.findOne({refreshToken: userRefreshToken})


            if(!user) {
                return Response.json({message: "user not found"} , {status: 404})
            }
        
            const accessToken = generateAccessToken({email: user.email})
            const refreshToken = generateRefreshToken({email: user.email})
    
            await UserModel.findOneAndUpdate({refreshToken: userRefreshToken} , {
                $set: {
                    refreshToken
                }
            })
    
            const headers = new Headers()
            headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true`)
            headers.append("Set-Cookie", `refresh-token=${refreshToken};path=/;httpOnly=true`)
    
        
            return Response.json({message: "user logged in successfully"} , {
                status: 200,
                headers
            })

        }


    } catch (err) {
        return Response.json({message: "interval error server for signin"} , {
            status: 500
        })
    }

}
