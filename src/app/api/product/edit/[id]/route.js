import connectToDB from "@/configs/db";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import ProductModel from "@/models/Product";
import { isValidObjectId } from "mongoose";
import { authAdmin, authUser } from "@/utils/authUserLink";

export async function PUT(req, { params }) {
  try {

    const admin = await authAdmin()
    if(!admin) {
      return Response.json({message: "this route is protected"} , {
        status: 401
      })
    }

    connectToDB();

    const id = params.id;

    if (!id) {
      return Response.json(
        { message: "id is required" },
        { status: 400 }
      );
    }

    if (!isValidObjectId(id)) {
      return Response.json(
        { message: "id is not valid" },
        { status: 422 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name");
    const price = formData.get("price");
    const shortDesc = formData.get("shortDesc");
    const longDesc = formData.get("longDesc");
    const weight = formData.get("weight");
    const suitableFor = formData.get("suitableFor");
    const smell = formData.get("smell");
    const tags = formData.get("tags");
    const stock = formData.get("stock");
    const uses = formData.get("uses");
    const img = formData.get("img");
    const score = parseInt(formData.get("score"))

    const existingProduct = await ProductModel.findOne({_id: id});
    if (!existingProduct) {
      return Response.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const updateData = {
      name: name || existingProduct.name,
      price: price || existingProduct.price,
      shortDesc: shortDesc || existingProduct.shortDesc,
      longDesc: longDesc || existingProduct.longDesc,
      weight: weight || existingProduct.weight,
      suitableFor: suitableFor || existingProduct.suitableFor,
      smell: smell || existingProduct.smell,
      tags: tags || existingProduct.tags,
      img: img || existingProduct.img,
      score: score || existingProduct.score,
      stock: stock || existingProduct.stock,
      uses: uses || existingProduct.uses
    };

    if (img && img.size > 0) {
      if (existingProduct.img) {
        try {
          const imgUrl = new URL(existingProduct.img);
          const filePath = path.join(process.cwd(), "public", imgUrl.pathname);
          await unlink(filePath);
          console.log(`old img is deleted successfully: ${filePath}`);
        } catch (err) {
          console.error(`err in delete old-img: ${err.message}`);
        }
      }

      const buffer = Buffer.from(await img.arrayBuffer());
      const filename = Date.now() + img.name;
      const imgPath = path.join(process.cwd(), "public/uploads/" + filename);
      await writeFile(imgPath, buffer);

      updateData.img = `http://localhost:3000/uploads/${filename}`;
    }

    await ProductModel.findByIdAndUpdate(id, updateData, { new: true });

    return Response.json({ 
      message: "product is created successfully",
    });

  } catch (err) {
    return Response.json(
      { message: `err in server: ${err.message}` },
      { status: 500 }
    );
  }
}