import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product"

export async function POST(req) {
  connectToDB();

  try {

    const body = await req.json();
    const { name, price, shortDesc, longDesc, weight, suitableFor, smell, tags } = body;

     await ProductModel.create({ name, price, shortDesc, longDesc, weight, suitableFor, smell, tags })

    return Response.json({message: "product is created successfully"} , {
        status: 201
    })

  } catch (err) {
    return Response.json({message: `interval error server for create product => ${err}`})
  }

}

export async function GET(req) {

    try {
        const product = await ProductModel.find({} , '-__v').populate("comments")

        return Response.json(product)
    } catch (err) {
        return Response.json({message: `interval error server for receive product => ${err}`})

    }

}
