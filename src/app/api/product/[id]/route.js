import connectToDB from "@/configs/db"
import { isValidObjectId } from "mongoose"
import ProductModel from "@/models/Product"


export async function DELETE(req , {params}) {

    try {

        connectToDB()
        
        const id = params.id 

        if(!id) {
            return Response.json({message: "id must sent"} , {
                status: 400
            })
        }

        if(!isValidObjectId(id)) {
            return Response.json({message: "id is not valid"} , {
                status: 422
            })
        }

        const isExistProduct = await ProductModel.findOne({_id: id})

        if(!isExistProduct) {
            return Response.json({message: "product is not found"} , {
                status: 404
            })
        }

        await ProductModel.findOneAndDelete({_id: id})

        return Response.json({message: "product is deleted successfully"})
    } catch (err) {
        return Response.json({message: `interval error server for create product => ${err}`} , {
          status: 500
        })
      }

}
