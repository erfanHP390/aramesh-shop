import connectToDB from "@/configs/db";
import { validateEmail, validatePhone } from "@/utils/auth";
import OrdersModel from "@/models/Orders"


export async function POST(req) {
    try {

        connectToDB()
        const body = await req.json()
        const {firstname,lastname,company,province,city,address,postCode,mobile,email,description,totalPrice,postPrice,Basket,products} = body

        if(!firstname || !lastname || !province || !city || !address || !postCode || !mobile || !email || !totalPrice || !postPrice || !Basket || !products) {
            return Response.json({message: "please fill all fields expect company and description"} , {status: 400})
        }

        const isValidPhone = validatePhone(mobile)
        if(!isValidPhone) {
            return Response.json({message: "phone is not valid"} , {
                status: 422
            })
        }

        const isValidEmail = validateEmail(email)
        if(!isValidEmail) {
            return Response.json({message: "email is not valid"} , {
                status: 422
            })
        }

        await OrdersModel.create({
            firstname,lastname,company,province,city,address,postCode,mobile,email,description,totalPrice,postPrice,Basket,products
        })

        return Response.json({message: "order is created successfully"} , {
            status: 201
        })


    } catch (err) {
        return Response.json(
          { message: `interval error server ${err}` },
          {
            status: 500,
          }
        );
      }
}


