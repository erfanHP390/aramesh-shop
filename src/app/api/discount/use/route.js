import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount"

export async function PUT(req) {

    try {
        connectToDB()

        const body =await req.json()
        const {code} = body

        if(!code) {
            return Response.json({message: "code must be sent"} , {
                status: 400
            })
        }

        const discount = await DiscountModel.findOne({code})

        if(!discount) {
            return Response.json({message: "code not found"} , {
                status: 404
            })
        } else if (discount.uses === discount.maxUse) {
            return Response.json({message: "code is expired"} , {
                status: 422
            })
        } else {
            return Response.json(discount)
        }


    } catch (err) {
        return Response.json({message: `interval error ${err}`} , {
            status: 500
        })
    }


}