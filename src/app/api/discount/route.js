import connectToDB from "@/configs/db"
import DiscountModel from "@/models/Discount"

export async function POST(req) {

    try {

        connectToDB()

        const body = await req.json()
        const {code , percent , maxUse} = body

        if(!code || !percent || !maxUse) {
            return Response.json({message: "all fields must be filled"} , {
                status: 400
            })
        }

        await DiscountModel.create({code , percent , maxUse})

        return Response.json({message: "discount created successfully"} , {
            status: 201
        })

    } catch (err) {
        return Response.json({message: `interval error server: ${err}`} , {
            status: 500
        })
    }

}
