import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product"
// import fs from "fs";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  connectToDB();

  try {

    const body = await req.json();
    const { name, price, shortDesc, longDesc, weight, suitableFor, smell, tags } = body;

    if(!name || !price || !shortDesc || !longDesc || !weight || !smell || !tags) {
      return Response.json({message: "all fields must have something expect score"} , {
        status: 400
      } )
    }

     await ProductModel.create({ name, price, shortDesc, longDesc, weight, suitableFor, smell, tags })

    return Response.json({message: "product is created successfully"} , {
        status: 201
    })

  } catch (err) {
    return Response.json({message: `interval error server for create product => ${err}`} , {
      status: 500
    })
  }

}


export async function PUT(req) {

  try {
    const formData = await req.formData()
    const img = formData.get("img")
    
  
    if(!img) {
      return Response.json({message: "product has not image"} , {
        status: 400
      })
    }

    const buffer = Buffer.from(await img.arrayBuffer());
    const filename = Date.now() + img.name;

    await writeFile(path.join(process.cwd() , "public/uploads/" + filename) , buffer)
  
    return Response.json({message: "file uploaded successfully"} , {
      status: 201
    })
  } catch (err) {
    return Response.json({message: `interval error server for receive product => ${err}`} , {
      status: 500
    })

}

}


export async function GET(req) {

    try {
        const product = await ProductModel.find({} , '-__v').populate("comments")

        return Response.json(product)
    } catch (err) {
        return Response.json({message: `interval error server for receive product => ${err}`} , {
          status: 500
        })

    }

}
