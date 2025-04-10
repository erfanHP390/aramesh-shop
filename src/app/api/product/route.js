import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product"
import { authAdmin } from "@/utils/authUserLink";
// import fs from "fs";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  connectToDB();

  try {

        const admin = await authAdmin();
        if (!admin) {
          return Response.json(
            { message: "this route is protected" },
            {
              status: 401,
            }
          );
        }

    const formData = await req.formData();

      const name = formData.get("name") 
      const price = formData.get("price") 
      const shortDesc = formData.get("shortDesc") 
      const longDesc = formData.get("longDesc") 
      const weight = formData.get("weight") 
      const suitableFor = formData.get("suitableFor") 
      const smell = formData.get("smell") 
      const tags = formData.get("tags")
      const img = formData.get("img")

      const buffer = Buffer.from(await img.arrayBuffer());
      const filename = Date.now() + img.name;
      const imgPath = path.join(process.cwd() , "public/uploads/" + filename)
  
      await writeFile(imgPath , buffer)


    if(!name || !price || !shortDesc || !longDesc || !weight || !smell || !tags) {
      return Response.json({message: "all fields must have something expect score"} , {
        status: 400
      } )
    }

    if(!img) {
      return Response.json({message: "product has not image"} , {
        status: 400
      })
    }


     await ProductModel.create({ name, price, shortDesc, longDesc, weight, suitableFor, smell, tags , img: `http://localhost:3000/uploads/${filename}` })

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
